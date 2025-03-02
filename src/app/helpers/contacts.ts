import {
  Address,
  AgeRangeType,
  Biography,
  Birthday,
  CalendarUrl,
  ClientData,
  ConnectionsList,
  ContactGroupMembership,
  CoverPhoto,
  Date,
  DomainMembership,
  EmailAddress,
  Event,
  ExternalId,
  FieldMetadata,
  FileAs,
  Gender,
  HasMetadata,
  ImClient,
  Interest,
  Locale,
  Location,
  Membership,
  MiscKeyword,
  Name,
  Nickname,
  Occupation,
  Organization,
  Person,
  PersonMetadata,
  PhoneNumber,
  Photo,
  ProfileMetadata,
  Relation,
  SipAddress,
  Skill,
  Source,
  Url,
  UserDefined,
} from '../models/contacts';
import { readonlyArray } from './common';

/**
 * Parser Functions
 */

export function parseDate(data?: Date) {
  return { ...data } as const;
}

export function parseProfileMetadata(data?: ProfileMetadata) {
  return { ...data } as const;
}

export function parseSource(data?: Source) {
  return {
    ...data,
    profileMetadata: parseProfileMetadata(data?.profileMetadata),
  } as const;
}

export function parseFieldMetadata(data?: FieldMetadata) {
  return {
    ...data,
    source: parseSource(data?.source),
  } as const;
}

export function parsePersonMetadata(data?: PersonMetadata) {
  return {
    ...data,
    sources: readonlyArray(
      (data?.sources || []).map((data: Source) => parseSource(data)),
    ),
  } as const;
}

export function parseHasMetadata(data?: HasMetadata) {
  return {
    ...data,
    metadata: parseFieldMetadata(data?.metadata),
  } as const;
}

export function parseAddress(data?: Address) {
  return {
    ...data,
    ...parseHasMetadata(data),
  } as const;
}

export function parseAgeRangeType(data?: AgeRangeType) {
  return {
    ...data,
    ...parseHasMetadata(data),
  } as const;
}

export function parseBiography(data?: Biography) {
  return {
    ...data,
    ...parseHasMetadata(data),
  } as const;
}

export function parseBirthday(data?: Birthday) {
  return {
    ...data,
    ...parseHasMetadata(data),
  } as const;
}

export function parseCalendarUrl(data?: CalendarUrl) {
  return {
    ...data,
    ...parseHasMetadata(data),
  } as const;
}

export function parseClientData(data?: ClientData) {
  return {
    ...data,
    ...parseHasMetadata(data),
  } as const;
}

export function parseCoverPhoto(data?: CoverPhoto) {
  return {
    ...data,
    ...parseHasMetadata(data),
  } as const;
}

export function parseEmailAddress(data?: EmailAddress) {
  return {
    ...data,
    ...parseHasMetadata(data),
  } as const;
}

export function parseEvent(data?: Event) {
  return {
    ...data,
    ...parseHasMetadata(data),
  } as const;
}

export function parseExternalId(data?: ExternalId) {
  return {
    ...data,
    ...parseHasMetadata(data),
  } as const;
}

export function parseFileAs(data?: FileAs) {
  return {
    ...data,
    ...parseHasMetadata(data),
  } as const;
}

export function parseGender(data?: Gender) {
  return {
    ...data,
    ...parseHasMetadata(data),
  } as const;
}

export function parseImClient(data?: ImClient) {
  return {
    ...data,
    ...parseHasMetadata(data),
  } as const;
}

export function parseInterest(data?: Interest) {
  return {
    ...data,
    ...parseHasMetadata(data),
  } as const;
}

export function parseLocale(data?: Locale) {
  return {
    ...data,
    ...parseHasMetadata(data),
  } as const;
}

export function parseLocation(data?: Location) {
  return {
    ...data,
    ...parseHasMetadata(data),
  } as const;
}

export function parseContactGroupMembership(data?: ContactGroupMembership) {
  return { ...data } as const;
}

export function parseDomainMembership(data?: DomainMembership) {
  return { ...data } as const;
}

export function parseMembership(data?: Membership) {
  const membership = {
    ...data,
    ...parseHasMetadata(data),
  };

  if (
    ((
      membership: Membership & { contactGroupMembership?: unknown },
    ): membership is Membership & {
      readonly contactGroupMembership?: ContactGroupMembership;
    } => typeof membership.contactGroupMembership !== 'undefined')(membership)
  ) {
    membership.contactGroupMembership = parseContactGroupMembership(
      membership.contactGroupMembership,
    );
  }

  if (
    ((
      membership: Membership & { domainMembership?: unknown },
    ): membership is Membership & {
      readonly domainMembership?: DomainMembership;
    } => typeof membership.domainMembership !== 'undefined')(membership)
  ) {
    membership.domainMembership = parseDomainMembership(
      membership.domainMembership,
    );
  }

  return { ...membership } as const;
}

export function parseMiscKeyword(data?: MiscKeyword) {
  return {
    ...data,
    ...parseHasMetadata(data),
  } as const;
}

export function parseName(data?: Name) {
  return {
    ...data,
    ...parseHasMetadata(data),
  } as const;
}

export function parseNickname(data?: Nickname) {
  return {
    ...data,
    ...parseHasMetadata(data),
  } as const;
}

export function parseOccupation(data?: Occupation) {
  return {
    ...data,
    ...parseHasMetadata(data),
  } as const;
}

export function parseOrganization(data?: Organization) {
  return {
    ...data,
    ...parseHasMetadata(data),
    startDate: parseDate(data?.startDate),
    endDate: parseDate(data?.endDate),
  } as const;
}

export function parsePhoneNumber(data?: PhoneNumber) {
  return {
    ...data,
    ...parseHasMetadata(data),
  } as const;
}

export function parsePhoto(data?: Photo) {
  return {
    ...data,
    ...parseHasMetadata(data),
  } as const;
}

export function parseRelation(data?: Relation) {
  return {
    ...data,
    ...parseHasMetadata(data),
  } as const;
}

export function parseSipAddress(data?: SipAddress) {
  return {
    ...data,
    ...parseHasMetadata(data),
  } as const;
}

export function parseSkill(data?: Skill) {
  return {
    ...data,
    ...parseHasMetadata(data),
  } as const;
}

export function parseUrl(data?: Url) {
  return {
    ...data,
    ...parseHasMetadata(data),
  } as const;
}

export function parseUserDefined(data?: UserDefined) {
  return {
    ...data,
    ...parseHasMetadata(data),
  } as const;
}

export function parsePerson(data: Person) {
  return {
    ...data,
    metadata: parsePersonMetadata(data?.metadata),
    addresses: readonlyArray((data?.addresses || []).map(parseAddress)),
    ageRanges: readonlyArray((data?.ageRanges || []).map(parseAgeRangeType)),
    biographies: readonlyArray((data?.biographies || []).map(parseBiography)),
    birthdays: readonlyArray((data?.birthdays || []).map(parseBirthday)),
    calendarUrls: readonlyArray(
      (data?.calendarUrls || []).map(parseCalendarUrl),
    ),
    clientData: readonlyArray((data?.clientData || []).map(parseClientData)),
    coverPhotos: readonlyArray((data?.coverPhotos || []).map(parseCoverPhoto)),
    emailAddresses: readonlyArray(
      (data?.emailAddresses || []).map(parseEmailAddress),
    ),
    events: readonlyArray((data?.events || []).map(parseEvent)),
    externalIds: readonlyArray((data?.externalIds || []).map(parseExternalId)),
    fileAses: readonlyArray((data?.fileAses || []).map(parseFileAs)),
    genders: readonlyArray((data?.genders || []).map(parseGender)),
    imClients: readonlyArray((data?.imClients || []).map(parseImClient)),
    interests: readonlyArray((data?.interests || []).map(parseInterest)),
    locales: readonlyArray((data?.locales || []).map(parseLocale)),
    locations: readonlyArray((data?.locations || []).map(parseLocation)),
    memberships: readonlyArray((data?.memberships || []).map(parseMembership)),
    miscKeywords: readonlyArray(
      (data?.miscKeywords || []).map(parseMiscKeyword),
    ),
    names: readonlyArray((data?.names || []).map(parseName)),
    nicknames: readonlyArray((data?.nicknames || []).map(parseNickname)),
    occupations: readonlyArray((data?.occupations || []).map(parseOccupation)),
    organizations: readonlyArray(
      (data?.organizations || []).map(parseOrganization),
    ),
    phoneNumbers: readonlyArray(
      (data?.phoneNumbers || []).map(parsePhoneNumber),
    ),
    photos: readonlyArray((data?.photos || []).map(parsePhoto)),
    relations: readonlyArray((data?.relations || []).map(parseRelation)),
    sipAddresses: readonlyArray(
      (data?.sipAddresses || []).map(parseSipAddress),
    ),
    skills: readonlyArray((data?.skills || []).map(parseSkill)),
    urls: readonlyArray((data?.urls || []).map(parseUrl)),
    userDefined: readonlyArray((data?.userDefined || []).map(parseUserDefined)),
  } as const;
}

export function parseConnectionsList(data: ConnectionsList) {
  return {
    ...data,
    connections: readonlyArray((data?.connections || []).map(parsePerson)),
  } as const;
}

// Utilities

export function getPrimaryMetadata<T extends HasMetadata>(
  items: readonly T[],
): T | undefined {
  return items.find((item) => item?.metadata?.primary);
}

export function displayName(names: readonly Name[]): string | undefined {
  return getPrimaryMetadata(names)?.displayName;
}

export function displayEmailAddress(
  emailAddresses: readonly EmailAddress[],
): string | undefined {
  return getPrimaryMetadata(emailAddresses)?.value;
}

export function displayPhoneNumber(
  phoneNumbers: readonly PhoneNumber[],
): string | undefined {
  return getPrimaryMetadata(phoneNumbers)?.value;
}

export function displayPhoto(photos: readonly Photo[]): string | undefined {
  return getPrimaryMetadata(photos)?.url;
}

export function urlPhotos(photos: readonly Photo[]): string | undefined {
  return getPrimaryMetadata(photos)?.url;
}
