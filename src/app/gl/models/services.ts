import { InjectionToken } from '@angular/core';

export interface OauthConfiguration {
  readonly name: string;
  readonly clientId: string;
  readonly clientSecret?: string;
  readonly accessTokenUrl: string;
  readonly authorizationCodeUrl?: string;
  readonly redirectUri: string;
}

export interface AccessTokenData {
  readonly access_token: string;
  readonly expires_in: number; // seconds
  readonly refresh_token?: string;
  readonly id_token?: string;
  readonly token_type: string;
  readonly scope: string;
}

export type IdTokenData = string;

export type RefreshTokenData = string;

export class AccessTokenNotFound extends Error {
  override name = this.constructor.name;

  constructor(message = 'Access Token not Found!!!', options?: ErrorOptions) {
    super(message, options);
  }
}

export class StateTokenNotFound extends Error {
  override name = this.constructor.name;

  constructor(stateToken: string, options?: ErrorOptions) {
    super(`State token '${stateToken}' is not found or expired!!`, options);
  }
}

export interface KeyValueStorage {
  get<T>(key: string): Promise<T | null>;
  set<T>(key: string, value: T): Promise<void>;
  remove(key: string): Promise<void>;
}

export const KEY_VALUE_STORAGE = new InjectionToken<KeyValueStorage>(
  'key-value-storage',
);
