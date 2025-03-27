import { HttpClient } from '@angular/common/http';
import {
  computed,
  EnvironmentProviders,
  inject,
  Injectable,
  InjectionToken,
  makeEnvironmentProviders,
  resource,
} from '@angular/core';
import { catchError, firstValueFrom, of } from 'rxjs';
import {
  arrayBufferToBase64,
  randomString,
  sha256,
} from '../helpers/encryption';
import {
  AccessTokenData,
  AccessTokenNotFound,
  IdTokenData,
  KEY_VALUE_STORAGE,
  OauthConfiguration,
  RefreshTokenData,
  StateTokenNotFound,
} from '../models/services';

const storagePrefix = 'oauth';

const stateTokenLength = 32;
const codeVerifierLength = 54;

const stateDataTtl = 10 * 60 * 1000; // 10 minutes
const latency = 1000 * 10;

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
    StoredData {}

type StoredRefreshTokenData = RefreshTokenData;

type StoredIdTokenData = IdTokenData;

interface StateData<T extends object = object> {
  readonly codeVerifier: string;
  readonly state: T;
}

interface StoredStateData<T extends StateData['state'] = StateData['state']>
  extends StateData<T>,
    StoredData {}

@Injectable()
export class OauthService {
  private readonly config = inject(OAUTH_CONFIGURATION);
  private readonly storage = inject(KEY_VALUE_STORAGE);
  private readonly http = inject(HttpClient);

  private readonly storageStateDataKey =
    `${storagePrefix}-${this.config.name}-state-data` as const;

  private readonly storeRefreshTokenDataKey =
    `${storagePrefix}-${this.config.name}-refresh-token-data` as const;

  private readonly storeAccessTokenDataKey =
    `${storagePrefix}-${this.config.name}-access-token-data` as const;

  private async fetchRefreshTokenData(): Promise<StoredRefreshTokenData | null> {
    return this.storage.get<StoredRefreshTokenData>(
      this.storeRefreshTokenDataKey,
    );
  }
  private async storeRefreshTokenData(
    refreshTokenData: RefreshTokenData,
  ): Promise<StoredRefreshTokenData> {
    await this.storage.set<StoredRefreshTokenData>(
      this.storeRefreshTokenDataKey,
      refreshTokenData,
    );

    return refreshTokenData;
  }

  private async removeRefreshTokenData(): Promise<void> {
    return this.storage.remove(this.storeRefreshTokenDataKey);
  }

  private async refreshAccessTokenData(): Promise<StoredAccessTokenData | null> {
    const refreshTokenData = await this.fetchRefreshTokenData();

    if (refreshTokenData) {
      const accessTokenData = await firstValueFrom(
        this.http
          .post<AccessTokenData>(this.config.accessTokenUrl, {
            client_id: this.config.clientId,
            client_secret: this.config.clientSecret,
            grant_type: 'refresh_token',
            refresh_token: refreshTokenData,
          })
          .pipe(
            catchError((error) => {
              console.error(error?.error ?? error);

              return of(null);
            }),
          ),
      );
      if (accessTokenData !== null) {
        return await this.storeAccessTokenData(accessTokenData);
      }
    }
    return null;
  }

  async getAccessTokenData(): Promise<StoredAccessTokenData | null> {
    const storedAccessTokenData = await this.fetchAccessTokenData();

    if (
      storedAccessTokenData &&
      storedAccessTokenData.expiredAt >= Date.now()
    ) {
      return storedAccessTokenData;
    }
    return this.refreshAccessTokenData();
  }

  private readonly accessTokenResource = resource({
    loader: async () => (await this.getAccessTokenData())?.access_token ?? null,
  });

  readonly accessToken = computed(this.accessTokenResource.value, {
    equal: (pre, next) => typeof next === 'undefined' || Object.is(pre, next),
  });

  readonly ready = computed(() => {
    const accessToken = this.accessToken();

    return typeof accessToken === 'undefined'
      ? undefined
      : accessToken !== null;
  });

  private async fetchAccessTokenData(): Promise<StoredAccessTokenData | null> {
    return await this.storage.get<StoredAccessTokenData>(
      this.storeAccessTokenDataKey,
    );
  }
  private async storeAccessTokenData(
    accessTokenData: AccessTokenData,
  ): Promise<StoredAccessTokenData> {
    const { refresh_token, ...restAccessTokenData } = accessTokenData;

    if (refresh_token) {
      await this.storeRefreshTokenData(refresh_token);
    }

    const storedAccessTokenData: StoredAccessTokenData = {
      ...restAccessTokenData,
      expiredAt: Date.now() + accessTokenData.expires_in * 1000 - latency,
    };

    await this.storage.set(this.storeAccessTokenDataKey, storedAccessTokenData);

    this.accessTokenResource.set(storedAccessTokenData.access_token);

    return storedAccessTokenData;
  }

  async getAccessTokenHeaders(): Promise<{Authorization: string}>{
    const storedAccessTokenData = await this.getAccessTokenData();

    if(storedAccessTokenData?.access_token){
      const { token_type, access_token } = storedAccessTokenData;

      return {
        Authorization: `${token_type[0].toUpperCase()}${token_type.slice(1)} ${access_token}`
      }
    }
    throw new AccessTokenNotFound();


  }

  private async removeAccessTokenData(): Promise<void> {
    await this.storage.remove(this.storeAccessTokenDataKey);
    this.accessTokenResource.set(null);
  }

  private async fetchStateData<T extends StateData['state']>(
    stateToken: string,
  ): Promise<StoredStateData<T> | null> {
    const storedStateDataRecord =
      (await this.storage.get<Record<string, StoredStateData>>(
        this.storageStateDataKey,
      )) ?? {};

    const now = Date.now();

    const remainStoredStateDataRecord = Object.fromEntries(
      Object.entries(storedStateDataRecord).filter(
        ([key, value]) => value.expiredAt >= now,
      ),
    );

    await this.storeStateDataRecord(remainStoredStateDataRecord);

    return (storedStateDataRecord[stateToken] as StoredStateData<T>) ?? null;
  }

  private async storeStateData<T extends StateData['state']>(
    stateToken: string,
    stateData: StateData<T>,
  ): Promise<StoredStateData<T>> {
    const storedStateDataRecord =
      (await this.storage.get<Record<string, StoredStateData>>(
        this.storageStateDataKey,
      )) ?? {};
    const storedStateData: StoredStateData<T> = {
      ...stateData,
      expiredAt: Date.now() + stateDataTtl,
    };
    storedStateDataRecord[stateToken] = storedStateData;

    await this.storeStateDataRecord(storedStateDataRecord);
    return storedStateData;
  }

  private async removeStateData(stateToken: string): Promise<void> {
    const storedStateDataRecord =
      (await this.storage.get<Record<string, StoredStateData>>(
        this.storageStateDataKey,
      )) ?? {};
    delete storedStateDataRecord[stateToken];

    return await this.storeStateDataRecord(storedStateDataRecord);
  }

  private async clearStateDataRecord(): Promise<void> {
    return await this.storage.remove(this.storageStateDataKey);
  }

  private async storeStateDataRecord(
    record: Record<string, StateData>,
  ): Promise<void> {
    if (Object.keys(record).length === 0) {
      return await this.clearStateDataRecord();
    } else {
      return await this.storage.set(this.storageStateDataKey, record);
    }
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

  async getAuthorizationCodeUrl<T extends StateData['state']>(
    scopes: readonly string[],
    { state = {} as T, additionalParam = {} as Record<string, string> } = {},
  ): Promise<URL | null> {
    if (this.config.authorizationCodeUrl) {
      const url = new URL(this.config.authorizationCodeUrl);

      const { stateToken, codeChallenge } = await this.createStateData(state);

      url.searchParams.set('client_id', this.config.clientId);
      url.searchParams.set('redirect_uri', this.config.redirectUri);
      url.searchParams.set('response_type', 'code');
      url.searchParams.set('scope', scopes.join(' '));
      url.searchParams.set('code_challenge', codeChallenge);
      url.searchParams.set('code_challenge_method', 'S256');
      url.searchParams.set('state', stateToken);
      //TODO : code_challenge, code_challenge_method

      Object.entries(additionalParam).forEach(([key, value]) =>
        url.searchParams.set(key, value),
      );

      return url;
    } else {
      return null;
    }
  }

  async exchangeAuthorizationCode<T extends StateData['state']>(
    authorizationCode: string,
    stateToken: string,
  ): Promise<T> {
    const stateData = await this.fetchStateData<T>(stateToken);

    if (stateData === null) {
      throw new StateTokenNotFound(stateToken);
    }

    await this.storeAccessTokenData(
      await firstValueFrom(
        this.http.post<AccessTokenData>(this.config.accessTokenUrl, {
          client_id: this.config.clientId,
          client_secret: this.config.clientSecret,
          code: authorizationCode,
          code_verifier: stateData.codeVerifier,
          grant_type: 'authorization_code',
          redirect_uri: this.config.redirectUri,
        }),
      ),
    );
    await this.removeStateData(stateToken);

    return stateData.state;
  }

  async clear(): Promise<void> {
    await Promise.all([
      this.removeRefreshTokenData(),
      this.removeAccessTokenData(),
      this.storage.remove(this.storageStateDataKey),
    ]);
  }
}
