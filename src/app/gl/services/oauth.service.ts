import { HttpClient } from '@angular/common/http';
import {
  computed,
  CreateComputedOptions,
  EnvironmentProviders,
  inject,
  Injectable,
  InjectionToken,
  makeEnvironmentProviders,
  resource,
  Signal,
} from '@angular/core';
import { catchError, firstValueFrom, of } from 'rxjs';
import {
  arrayBufferToBase64,
  extrackJwtClaims,
  randomString,
  sha256,
} from '../helpers/encryption';
import {
  AccessTokenData,
  AccessTokenNotFound,
  IdTokenData,
  OauthConfiguration,
  RefreshTokenData,
  StateTokenNotFound,
} from '../models/services';
import { StorageService } from './storage.service';

const codeVerifierLength = 54;
const stateTokenLength = 32;
const stateDataTtl = 10 * 60 * 1000; // milli-second

const latency = 10 * 1000; // milli-second

export const OAUTH_CONFIGURATION = new InjectionToken<OauthConfiguration>(
  'oauth-configuration',
);

export function provideOauth(config: OauthConfiguration): EnvironmentProviders {
  return makeEnvironmentProviders([
    {
      provide: OAUTH_CONFIGURATION,
      useValue: config,
    },

    OauthService,
  ]);
}

interface StoredData {
  readonly expiredAt: number;
}

interface StoredAccessTokenData
  extends Omit<AccessTokenData, 'refresh_token' | 'id_token'>,
  StoredData { }

type StoredRefreshTokenData = RefreshTokenData;

type StoredIdTokenData = IdTokenData;

interface StateData<T extends object = object> {
  readonly codeVerifier: string;
  readonly state: T;
}

interface StoredStateData<T extends StateData['state'] = StateData['state']>
  extends StateData<T>,
  StoredData { }

@Injectable()
export class OauthService {
  private readonly config = inject(OAUTH_CONFIGURATION);
  private readonly storage = inject(StorageService);
  private readonly http = inject(HttpClient);

  private readonly storedRefreshTokenDataKey =
    `oauth-${this.config.name}-refresh-token` as const;

  private readonly storedIdTokenDataKey =
    `oauth-${this.config.name}-id-token` as const;

  private readonly storedParsedIdTokenDataKey =
    `oauth-${this.config.name}-parsed-id-token` as const;

  private readonly storedAccessTokenDataKey =
    `oauth-${this.config.name}-access-token` as const;

  private readonly storedStateDataKey =
    `oauth-${this.config.name}-states` as const;

  private readonly accessTokenResource = resource({
    loader: async () => (await this.getAccessTokenData())?.access_token ?? null,
  });

  readonly accessToken = computed(this.accessTokenResource.value, {
    equal: (pre, next) => typeof next === 'undefined' || Object.is(pre, next),
  });

  readonly ready = computed(() => {
    const accessToken = this.accessToken();

    return typeof accessToken === 'undefined' ? undefined : (
      accessToken !== null
    );
  });

  private readonly storedIdTokenResource = resource({
    loader: async () => await this.fetchIdTokenData(),
  });

  private readonly idToken = computed(this.storedIdTokenResource.value, {
    equal: (pre, next) => typeof next === 'undefined' || Object.is(pre, next),
  });

  // Refresh Token Storage
  private async storeRefreshTokenData(
    refreshTokenData: RefreshTokenData,
  ): Promise<StoredRefreshTokenData> {
    await this.storage.set(
      this.storedRefreshTokenDataKey,
      refreshTokenData as StoredRefreshTokenData,
    );

    return refreshTokenData as StoredRefreshTokenData;
  }

  private async fetchRefreshTokenData(): Promise<StoredRefreshTokenData | null> {
    return await this.storage.get<StoredRefreshTokenData>(
      this.storedRefreshTokenDataKey,
    );
  }

  private async removeRefreshTokenData(): Promise<void> {
    await this.storage.remove(this.storedRefreshTokenDataKey);
  }

  // ID Token Storage
  private async storeIdTokenData(
    idTokenData: IdTokenData,
  ): Promise<StoredIdTokenData> {
    await this.storage.set(
      this.storedIdTokenDataKey,
      idTokenData as StoredIdTokenData,
    );

    await this.storage.set(this.storedParsedIdTokenDataKey, {
      ...(await this.storage.get<object>(this.storedParsedIdTokenDataKey)),
      ...extrackJwtClaims<object>(idTokenData),
    });

    this.storedIdTokenResource.set(idTokenData);

    return idTokenData;
  }

  private async fetchIdTokenData(): Promise<StoredIdTokenData | null> {
    return await this.storage.get<StoredIdTokenData>(this.storedIdTokenDataKey);
  }

  private async removeIdTokenData(): Promise<void> {
    await this.storage.remove(this.storedParsedIdTokenDataKey);
    await this.storage.remove(this.storedIdTokenDataKey);

    this.storedIdTokenResource.set(null);
  }

  private async fetchParsedIdTokenData(): Promise<unknown> {
    return await this.storage.get(this.storedParsedIdTokenDataKey);
  }

  // Access Token Storage
  private async storeAccessTokenData(
    accessTokenData: AccessTokenData,
  ): Promise<StoredAccessTokenData> {
    const { refresh_token, id_token, ...restAccessTokenData } = accessTokenData;

    if (refresh_token) {
      await this.storeRefreshTokenData(refresh_token);
    }

    if (id_token) {
      await this.storeIdTokenData(id_token);
    }

    const storedAccessTokenData = {
      ...restAccessTokenData,
      expiredAt: Date.now() + restAccessTokenData.expires_in * 1000 - latency,
    };

    await this.storage.set<StoredAccessTokenData>(
      this.storedAccessTokenDataKey,
      storedAccessTokenData,
    );

    this.accessTokenResource.set(storedAccessTokenData.access_token);

    return storedAccessTokenData;
  }

  private async fetchAccessTokenData(): Promise<StoredAccessTokenData | null> {
    return await this.storage.get<StoredAccessTokenData>(
      this.storedAccessTokenDataKey,
    );
  }

  private async removeAccessTokenData(): Promise<void> {
    await this.storage.remove(this.storedAccessTokenDataKey);

    this.accessTokenResource.set(null);
  }

  /**
   * Get the new access token by using refresh token.
   */
  private async refreshAccessTokenData(): Promise<StoredAccessTokenData | null> {
    const refreshToken = await this.fetchRefreshTokenData();

    if (refreshToken) {
      const accessTokenData = await firstValueFrom(
        this.http
          .post<AccessTokenData>(this.config.accessTokenUrl, {
            client_id: this.config.clientId,
            client_secret: this.config.clientSecret,
            grant_type: 'refresh_token',
            refresh_token: refreshToken,
          })
          .pipe(
            catchError((error) => {
              console.error(error?.error ?? error);

              return of(null);
            }),
          ),
      );

      if (accessTokenData) {
        return await this.storeAccessTokenData(accessTokenData);
      }
    }

    return null;
  }

  async getAccessTokenData(): Promise<StoredAccessTokenData | null> {
    const storedAccessTokenData = await await this.fetchAccessTokenData();

    if (
      storedAccessTokenData &&
      storedAccessTokenData.expiredAt >= Date.now()
    ) {
      return storedAccessTokenData;
    } else {
      return await this.refreshAccessTokenData();
    }
  }

  async getAuthorizationHeaders(): Promise<{
    Authorization: `${string} ${string}`;
  }> {
    const accessTokenData = await this.getAccessTokenData();

    if (accessTokenData) {
      const { token_type, access_token } = accessTokenData;

      return {
        Authorization:
          `${token_type[0].toUpperCase()}${token_type.slice(1)} ${access_token}` as const,
      };
    }

    throw new AccessTokenNotFound();
  }

  // State Data Storage
  private async fetchStateData<
    T extends StateData['state'] = StateData['state'],
  >(stateToken: string): Promise<StateData<T> | null> {
    const storedStateDataRecord =
      (await this.storage.get<Record<string, StoredStateData<T>>>(
        this.storedStateDataKey,
      )) ?? {};

    const now = Date.now();
    const entries = Object.entries(storedStateDataRecord);
    const avaliableEntries = entries.filter(
      ([, value]) => value.expiredAt >= now,
    );
    const avaliableStoredStateDataRecord = Object.fromEntries(avaliableEntries);

    if (entries.length !== avaliableEntries.length) {
      await this.storage.set(
        this.storedStateDataKey,
        avaliableStoredStateDataRecord,
      );
    }

    return avaliableStoredStateDataRecord[stateToken] ?? null;
  }

  private async storeStateData<T extends StateData['state']>(
    stateToken: string,
    stateData: StateData<T>,
  ): Promise<void> {
    const storedStateDataRecord =
      (await this.storage.get<Record<string, StoredStateData<T>>>(
        this.storedStateDataKey,
      )) ?? {};

    storedStateDataRecord[stateToken] = {
      ...stateData,
      expiredAt: Date.now() + stateDataTtl,
    };

    return await this.storage.set(
      this.storedStateDataKey,
      storedStateDataRecord,
    );
  }

  private async removeStateData(stateToken: string): Promise<void> {
    const storedStateDataRecord =
      (await this.storage.get<Record<string, StoredStateData>>(
        this.storedStateDataKey,
      )) ?? {};

    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const { [stateToken]: _removed, ...remainStoredStateDataRecord } =
      storedStateDataRecord;

    if (Object.keys(remainStoredStateDataRecord).length === 0) {
      await this.clearStateData();
    } else {
      await this.storage.set(
        this.storedStateDataKey,
        remainStoredStateDataRecord,
      );
    }
  }

  private async clearStateData(): Promise<void> {
    await this.storage.remove(this.storedStateDataKey);
  }

  private async createStateData(
    state: StateData['state'],
  ): Promise<{ stateToken: string; codeChallenge: string }> {
    const stateToken = randomString(stateTokenLength);

    const codeVerifier = randomString(codeVerifierLength);
    const codeChallenge = arrayBufferToBase64(await sha256(codeVerifier), true);

    await this.storeStateData(stateToken, {
      codeVerifier,
      state,
    });

    return { stateToken, codeChallenge };
  }

  async getAuthorizationUrl<T extends StateData['state']>(
    scopes: readonly string[],
    { state = {} as T, additionalParams = {} as Record<string, string> } = {},
  ): Promise<URL | null> {
    const authorizationCodeUrl = this.config.authorizationCodeUrl;

    if (authorizationCodeUrl) {
      const { stateToken, codeChallenge } = await this.createStateData(state);

      const url = new URL(authorizationCodeUrl);

      url.searchParams.set('client_id', this.config.clientId);
      url.searchParams.set('response_type', 'code');
      url.searchParams.set('scope', scopes.join(' '));
      url.searchParams.set('state', stateToken);
      url.searchParams.set('code_challenge', codeChallenge);
      url.searchParams.set('code_challenge_method', 'S256');
      url.searchParams.set('redirect_uri', this.config.redirectUri);

      Object.entries(additionalParams).forEach(([key, value]) =>
        url.searchParams.set(key, value),
      );

      return url;
    } else {
      return null;
    }
  }

  async exchangeAuthorizationcode<T extends StateData['state']>(
    authorizaitonCode: string,
    stateToken: string,
  ): Promise<T> {
    const stateData = await this.fetchStateData<T>(stateToken);

    if (stateData === null) {
      throw new StateTokenNotFound(stateToken, {
        cause: { authorizaitonCode },
      });
    }

    await this.storeAccessTokenData(
      await firstValueFrom(
        this.http.post<AccessTokenData>(this.config.accessTokenUrl, {
          client_id: this.config.clientId,
          client_secret: this.config.clientSecret,
          code: authorizaitonCode,
          code_verifier: stateData.codeVerifier,
          grant_type: 'authorization_code',
          redirect_uri: this.config.redirectUri,
        }),
      ),
    );

    await this.removeStateData(stateToken);

    return stateData.state;
  }

  private readonly parsedIdToken = resource({
    request: this.idToken,

    loader: async () => await this.fetchParsedIdTokenData(),
  }).value.asReadonly();

  computedParsedIdToken<R>(
    options?: CreateComputedOptions<R | null | undefined>,
  ): Signal<R | null | undefined>;

  computedParsedIdToken<T, R>(
    computation: (parsedIdToken: T | null | undefined) => R,
    options?: CreateComputedOptions<R>,
  ): Signal<R>;

  computedParsedIdToken<T, R>(
    computationOrOptions?:
      | ((parsedIdToken: T | null | undefined) => R)
      | CreateComputedOptions<R | null | undefined>,
    undefinedOroptions?: CreateComputedOptions<R | null | undefined>,
  ) {
    const { computation, options } =
      typeof computationOrOptions === 'function' ?
        {
          computation: computationOrOptions,
          options: undefinedOroptions,
        }
        : {
          computation: undefined,
          options:
            typeof computationOrOptions !== 'undefined' ? computationOrOptions
              : undefinedOroptions,
        };

    return computed(() => {
      if (typeof computation === 'function') {
        return computation(this.parsedIdToken() as T | null | undefined);
      } else {
        return this.parsedIdToken() as R | null | undefined;
      }
    }, options);
  }

  async clear(): Promise<void> {
    await Promise.all([
      this.removeRefreshTokenData(),
      this.removeIdTokenData(),
      this.removeAccessTokenData(),
      this.storage.remove(this.storedStateDataKey),
    ]);
  }
}
