import { RequiredProperties } from './common';
import { integer } from './core';

export type ObjectType = 'OBJECT_TYPE_UNSPECIFIED' | 'PERSON' | 'PAGE';

export type SourceType =
  | 'SOURCE_TYPE_UNSPECIFIED'
  | 'ACCOUNT'
  | 'PROFILE'
  | 'DOMAIN_PROFILE'
  | 'CONTACT'
  | 'OTHER_CONTACT'
  | 'DOMAIN_CONTACT';

export type UserType =
  | 'USER_TYPE_UNKNOWN'
  | 'GOOGLE_USER'
  | 'GPLUS_USER'
  | 'GOOGLE_APPS_USER';

export type AgeRange =
  | 'AGE_RANGE_UNSPECIFIED'
  | 'LESS_THAN_EIGHTEEN'
  | 'EIGHTEEN_TO_TWENTY'
  | 'TWENTY_ONE_OR_OLDER';

export type ContentType =
  | 'CONTENT_TYPE_UNSPECIFIED'
  | 'TEXT_PLAIN'
  | 'TEXT_HTML';

export type KeywordType =
  | 'TYPE_UNSPECIFIED'
  | 'OUTLOOK_BILLING_INFORMATION'
  | 'OUTLOOK_DIRECTORY_SERVER'
  | 'OUTLOOK_KEYWORD'
  | 'OUTLOOK_MILEAGE'
  | 'OUTLOOK_PRIORITY'
  | 'OUTLOOK_SENSITIVITY'
  | 'OUTLOOK_SUBJECT'
  | 'OUTLOOK_USER'
  | 'HOME'
  | 'WORK'
  | 'OTHER';

export type NicknameType = 'DEFAULT' | 'ALTERNATE_NAME';

export type ReadSourceType =
  | 'READ_SOURCE_TYPE_UNSPECIFIED'
  | 'READ_SOURCE_TYPE_PROFILE'
  | 'READ_SOURCE_TYPE_CONTACT'
  | 'READ_SOURCE_TYPE_DOMAIN_CONTACT';

export type SortOrder =
  | 'LAST_MODIFIED_ASCENDING'
  | 'LAST_MODIFIED_DESCENDING'
  | 'FIRST_NAME_ASCENDING'
  | 'LAST_NAME_ASCENDING';

export interface Date {
  readonly year?: integer;
  readonly month?: integer;
  readonly day?: integer;
}

export interface ProfileMetadata {
  readonly objectType?: ObjectType;
  readonly userTypes?: readonly UserType[];
}

export interface Source {
  readonly type?: SourceType;
  readonly id?: string;
  readonly etag?: string;
  readonly updateTime?: string;
  readonly profileMetadata?: ProfileMetadata;
}

export interface FieldMetadata {
  readonly primary?: boolean;
  readonly sourcePrimary?: boolean;
  readonly verified?: boolean;
  readonly source?: Source;
}

export interface PersonMetadata {
  readonly sources?: readonly Source[];
  readonly previousResourceNames?: readonly string[];
  readonly linkedPeopleResourceNames?: readonly string[];
  readonly deleted?: boolean;
}

export interface HasMetadata {
  readonly metadata?: FieldMetadata;
}

export interface Address extends HasMetadata {
  readonly formattedValue?: string;
  readonly type?: string;
  readonly formattedType?: string;
  readonly poBox?: string;
  readonly streetAddress?: string;
  readonly extendedAddress?: string;
  readonly city?: string;
  readonly region?: string;
  readonly postalCode?: string;
  readonly country?: string;
  readonly countryCode?: string;
}

export interface AgeRangeType extends HasMetadata {
  readonly ageRange?: AgeRange;
}

export interface Biography extends HasMetadata {
  readonly value?: string;
  readonly contentType?: ContentType;
}

export interface Birthday extends HasMetadata {
  readonly date?: Date;
  readonly text?: string;
}

export interface CalendarUrl extends HasMetadata {
  readonly url?: string;
  readonly type?: string;
  readonly formattedType?: string;
}

export interface ClientData extends HasMetadata {
  readonly key?: string;
  readonly value?: string;
}

export interface CoverPhoto extends HasMetadata {
  readonly url?: string;
  readonly default?: boolean;
}

export interface EmailAddress extends HasMetadata {
  readonly value?: string;
  readonly type?: string;
  readonly formattedType?: string;
  readonly displayName?: string;
}

export interface Event extends HasMetadata {
  readonly date?: Date;
  readonly type?: string;
  readonly formattedType?: string;
}

export interface ExternalId extends HasMetadata {
  readonly value?: string;
  readonly type?: string;
  readonly formattedType?: string;
}

export interface FileAs extends HasMetadata {
  readonly value?: string;
}

export interface Gender extends HasMetadata {
  readonly value?: string;
  readonly formattedValue?: string;
  readonly addressMeAs?: string;
}

export interface ImClient extends HasMetadata {
  readonly username?: string;
  readonly type?: string;
  readonly formattedType?: string;
  readonly protocol?: string;
  readonly formattedProtocol?: string;
}

export interface Interest extends HasMetadata {
  readonly value?: string;
}

export interface Locale extends HasMetadata {
  readonly value?: string;
}

export interface Location extends HasMetadata {
  readonly value?: string;
  readonly type?: string;
  readonly current?: boolean;
  readonly buildingId?: string;
  readonly floor?: string;
  readonly floorSection?: string;
  readonly deskCode?: string;
}

export interface ContactGroupMembership {
  readonly contactGroupResourceName?: string;
}

export interface DomainMembership {
  readonly inViewerDomain?: boolean;
}

export type Membership = HasMetadata &
  (
    | {
        readonly contactGroupMembership?: ContactGroupMembership;
      }
    | {
        readonly domainMembership?: DomainMembership;
      }
  );

export interface MiscKeyword extends HasMetadata {
  readonly value?: string;
  readonly type?: KeywordType;
  readonly formattedType?: string;
}

export interface Name extends HasMetadata {
  readonly displayName?: string;
  readonly displayNameLastFirst?: string;
  readonly unstructuredName?: string;
  readonly familyName?: string;
  readonly givenName?: string;
  readonly middleName?: string;
  readonly honorificPrefix?: string;
  readonly honorificSuffix?: string;
  readonly phoneticFullName?: string;
  readonly phoneticFamilyName?: string;
  readonly phoneticGivenName?: string;
  readonly phoneticMiddleName?: string;
  readonly phoneticHonorificPrefix?: string;
  readonly phoneticHonorificSuffix?: string;
}

export interface Nickname extends HasMetadata {
  readonly value?: string;
  readonly type?: NicknameType;
}

export interface Occupation extends HasMetadata {
  readonly value?: string;
}

export interface Organization extends HasMetadata {
  readonly type?: string;
  readonly formattedType?: string;
  readonly startDate?: Date;
  readonly endDate?: Date;
  readonly current?: boolean;
  readonly name?: string;
  readonly phoneticName?: string;
  readonly department?: string;
  readonly title?: string;
  readonly jobDescription?: string;
  readonly symbol?: string;
  readonly domain?: string;
  readonly location?: string;
  readonly costCenter?: string;
  readonly fullTimeEquivalentMillipercent?: integer;
}

export interface PhoneNumber extends HasMetadata {
  readonly value?: string;
  readonly canonicalForm?: string;
  readonly type?: string;
  readonly formattedType?: string;
}

export interface Photo extends HasMetadata {
  readonly url?: string;
  readonly default?: boolean;
}

export interface Relation extends HasMetadata {
  readonly person?: string;
  readonly type?: string;
  readonly formattedType?: string;
}

export interface SipAddress extends HasMetadata {
  readonly value?: string;
  readonly type?: string;
  readonly formattedType?: string;
}

export interface Skill extends HasMetadata {
  readonly value?: string;
}

export interface Url extends HasMetadata {
  readonly value?: string;
  readonly type?: string;
  readonly formattedType?: string;
}

export interface UserDefined extends HasMetadata {
  readonly key?: string;
  readonly value?: string;
}

export interface Person {
  readonly resourceName: string;
  readonly etag: string;
  readonly metadata?: PersonMetadata;
  readonly addresses?: readonly Address[];
  readonly ageRanges?: readonly AgeRangeType[];
  readonly biographies?: readonly [Biography]; // singleton
  readonly birthdays?: readonly [Birthday]; // singleton
  readonly calendarUrls?: readonly CalendarUrl[];
  readonly clientData?: readonly ClientData[];
  readonly coverPhotos?: readonly CoverPhoto[];
  readonly emailAddresses?: readonly EmailAddress[];
  readonly events?: readonly Event[];
  readonly externalIds?: readonly ExternalId[];
  readonly fileAses?: readonly FileAs[];
  readonly genders?: readonly [Gender]; // singleton
  readonly imClients?: readonly ImClient[];
  readonly interests?: readonly Interest[];
  readonly locales?: readonly Locale[];
  readonly locations?: readonly Location[];
  readonly memberships?: readonly Membership[];
  readonly miscKeywords?: readonly MiscKeyword[];
  readonly names?: readonly [Name]; // singleton
  readonly nicknames?: readonly Nickname[];
  readonly occupations?: readonly Occupation[];
  readonly organizations?: readonly Organization[];
  readonly phoneNumbers?: readonly PhoneNumber[];
  readonly photos?: readonly Photo[];
  readonly relations?: readonly Relation[];
  readonly sipAddresses?: readonly SipAddress[];
  readonly skills?: readonly Skill[];
  readonly urls?: readonly Url[];
  readonly userDefined?: readonly UserDefined[];
}

export interface ConnectionsList {
  readonly connections: readonly Person[];
  readonly nextPageToken: string;
  readonly nextSyncToken: string;
  readonly totalItems: integer;
}

export interface ConnectionsQueryParams {
  /**
   * **Required**. A field mask to restrict which fields on each person are returned. Multiple fields can be specified by separating them with commas. Valid values are:
   * * addresses
   * * ageRanges
   * * biographies
   * * birthdays
   * * calendarUrls
   * * clientData
   * * coverPhotos
   * * emailAddresses
   * * events
   * * externalIds
   * * genders
   * * imClients
   * * interests
   * * locales
   * * locations
   * * memberships
   * * metadata
   * * miscKeywords
   * * names
   * * nicknames
   * * occupations
   * * organizations
   * * phoneNumbers
   * * photos
   * * relations
   * * sipAddresses
   * * skills
   * * urls
   * * userDefined
   */
  readonly personFields: string;

  /**
   * *Optional*. A page token, received from a previous response `nextPageToken`. Provide this to retrieve the subsequent page.
   *
   * When paginating, all other parameters provided to `people.connections.list` must match the first call that provided the page token.
   */
  readonly pageToken?: string;

  /**
   * *Optional*. The number of connections to include in the response. Valid values are between 1 and 1000, inclusive. Defaults to 100 if not set or set to 0.
   */
  readonly pageSize?: integer;

  /**
   * *Optional*. The order in which the connections should be sorted. Defaults to `LAST_MODIFIED_ASCENDING`.
   */
  readonly sortOrder?: SortOrder;

  /**
   * *Optional*. Whether the response should return `nextSyncToken` on the last page of results. It can be used to get incremental changes since the last request by setting it on the request `syncToken`.
   *
   * More details about sync behavior at `people.connections.list`.
   */
  readonly requestSyncToken?: boolean;

  /**
   * *Optional*. A sync token, received from a previous response `nextSyncToken` Provide this to retrieve only the resources changed since the last request.
   *
   * When syncing, all other parameters provided to `people.connections.list` must match the first call that provided the sync token.
   *
   * More details about sync behavior at `people.connections.list`.
   */
  readonly syncToken?: string;

  /**
   * *Optional*. A mask of what source types to return. Defaults to `READ_SOURCE_TYPE_CONTACT` and `READ_SOURCE_TYPE_PROFILE` if not set.
   */
  readonly sources?: readonly SourceType[];
}

export interface ContactCreateQueryParams {
  /**
   * *Optional*. A field mask to restrict which fields on each person are returned. Multiple fields can be specified by separating them with commas. Defaults to all fields if not set. Valid values are:
   * * addresses
   * * ageRanges
   * * biographies
   * * birthdays
   * * calendarUrls
   * * clientData
   * * coverPhotos
   * * emailAddresses
   * * events
   * * externalIds
   * * genders
   * * imClients
   * * interests
   * * locales
   * * locations
   * * memberships
   * * metadata
   * * miscKeywords
   * * names
   * * nicknames
   * * occupations
   * * organizations
   * * phoneNumbers
   * * photos
   * * relations
   * * sipAddresses
   * * skills
   * * urls
   * * userDefined
   */
  readonly personFields?: string;

  /**
   * *Optional*. A mask of what source types to return. Defaults to `READ_SOURCE_TYPE_CONTACT` and `READ_SOURCE_TYPE_PROFILE` if not set.
   */
  readonly sources?: readonly SourceType[];
}

export type ContactCreateBody = Omit<
  Person,
  'resourceName' | 'etag' | 'names'
> & {
  readonly names: readonly [RequiredProperties<Name, 'givenName'>];
};
