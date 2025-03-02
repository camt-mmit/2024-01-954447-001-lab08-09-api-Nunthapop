import { RequiredProperties } from './common';
import { date, datetime, etag, integer } from './core';

export interface EventDateAllDay {
  readonly date: date;
}

export interface EventDateTime {
  readonly dateTime: datetime;
  readonly timeZone?: string;
}

export type EventDate = EventDateAllDay | EventDateTime;

export interface Event {
  readonly kind: 'calendar#event';
  readonly etag: etag;
  readonly id: string;
  readonly status?: string;
  readonly htmlLink?: string;
  readonly created?: datetime;
  readonly updated?: datetime;
  readonly summary?: string;
  readonly description?: string;
  readonly location?: string;
  readonly colorId?: string;
  readonly creator?: {
    readonly id?: string;
    readonly email?: string;
    readonly displayName?: string;
    readonly self?: boolean;
  };
  readonly organizer?: {
    readonly id?: string;
    readonly email?: string;
    readonly displayName?: string;
    readonly self?: boolean;
  };
  readonly start?: EventDate;
  readonly end?: EventDate;
  readonly endTimeUnspecified?: boolean;
  readonly recurrence?: readonly [string];
  readonly recurringEventId?: string;
  readonly originalStartTime?: {
    readonly date?: date;
    readonly dateTime?: datetime;
    readonly timeZone?: string;
  };
  readonly transparency?: string;
  readonly visibility?: string;
  readonly iCalUID?: string;
  readonly sequence?: integer;
  readonly attendees?: readonly {
    readonly id?: string;
    readonly email?: string;
    readonly displayName?: string;
    readonly organizer?: boolean;
    readonly self?: boolean;
    readonly resource?: boolean;
    readonly optional?: boolean;
    readonly responseStatus?: string;
    readonly comment?: string;
    readonly additionalGuests?: integer;
  }[];
  readonly attendeesOmitted?: boolean;
  readonly extendedProperties?: {
    readonly private?: Readonly<Record<string, string>>;
    readonly shared?: Readonly<Record<string, string>>;
  };
  readonly hangoutLink?: string;
  readonly conferenceData?: {
    readonly createRequest?: {
      readonly requestId?: string;
      readonly conferenceSolutionKey?: {
        readonly type?: string;
      };
      readonly status?: {
        readonly statusCode?: string;
      };
    };
    readonly entryPoints?: readonly {
      readonly entryPointType?: string;
      readonly uri?: string;
      readonly label?: string;
      readonly pin?: string;
      readonly accessCode?: string;
      readonly meetingCode?: string;
      readonly passcode?: string;
      readonly password?: string;
    }[];
    readonly conferenceSolution?: {
      readonly key?: {
        readonly type?: string;
      };
      readonly name?: string;
      readonly iconUri?: string;
    };
    readonly conferenceId?: string;
    readonly signature?: string;
    readonly notes?: string;
  };
  readonly gadget?: {
    readonly type?: string;
    readonly title?: string;
    readonly link?: string;
    readonly iconLink?: string;
    readonly width?: integer;
    readonly height?: integer;
    readonly display?: string;
    readonly preferences?: Readonly<Record<string, string>>;
  };
  readonly anyoneCanAddSelf?: boolean;
  readonly guestsCanInviteOthers?: boolean;
  readonly guestsCanModify?: boolean;
  readonly guestsCanSeeOtherGuests?: boolean;
  readonly privateCopy?: boolean;
  readonly locked?: boolean;
  readonly reminders?: {
    readonly useDefault?: boolean;
    readonly overrides?: readonly {
      readonly method?: string;
      readonly minutes?: integer;
    }[];
  };
  readonly source?: {
    readonly url?: string;
    readonly title?: string;
  };
  readonly attachments?: readonly {
    readonly fileUrl?: string;
    readonly title?: string;
    readonly mimeType?: string;
    readonly iconLink?: string;
    readonly fileId?: string;
  }[];
  readonly eventType?: string;
}

export interface EventsList {
  readonly kind: 'calendar#events';
  readonly etag: etag;
  readonly summary?: string;
  readonly description?: string;
  readonly updated?: datetime;
  readonly timeZone?: string;
  readonly accessRole?: string;
  readonly defaultReminders?: readonly {
    readonly method?: string;
    readonly minutes?: integer;
  }[];
  readonly nextPageToken?: string;
  readonly nextSyncToken?: string;
  readonly items?: readonly Event[];
}

export interface EventsQueryParams {
  /**
   * Event types to return. Optional. This parameter can be repeated multiple times to return events of different types. If unset, returns all event types.
   */
  readonly eventTypes?: readonly (
    | 'birthday'
    | 'default'
    | 'focusTime'
    | 'fromGmail'
    | 'outOfOffice'
    | 'workingLocation'
  )[];

  /**
   * Specifies an event ID in the iCalendar format to be provided in the response. Optional. Use this if you want to search for an event by its iCalendar ID.
   */
  readonly iCalUID?: string;

  /**
   * The maximum number of attendees to include in the response. If there are more than the specified number of attendees, only the participant is returned. Optional.
   */
  readonly maxAttendees?: integer;

  /**
   * Maximum number of events returned on one result page. The number of events in the resulting page may be less than this value, or none at all, even if there are more events matching the query. Incomplete pages can be detected by a non-empty nextPageToken field in the response. By default the value is 250 events. The page size can never be larger than 2500 events. Optional.
   */
  readonly maxResults?: integer;

  /**
   * The order of the events returned in the result. Optional. The default is an unspecified, stable order.
   */
  readonly orderBy?: 'startTime' | 'updated';

  /**
   * Token specifying which result page to return. Optional.
   */
  readonly pageToken?: string;

  /**
   * Extended properties constraint specified as propertyName=value. Matches only private properties. This parameter might be repeated multiple times to return events that match all given constraints.
   */
  readonly privateExtendedProperty?: string;

  /**
   * Free text search terms to find events that match these terms in the following fields: summary, description, location, attendee's displayName, attendee's email. Optional.
   */
  readonly q?: string;

  /**
   * Extended properties constraint specified as propertyName=value. Matches only shared properties. This parameter might be repeated multiple times to return events that match all given constraints.
   */
  readonly sharedExtendedProperty?: string;

  /**
   * Whether to include deleted events (with status equals "cancelled") in the result. Cancelled instances of recurring events (but not the underlying recurring event) will still be included if showDeleted and singleEvents are both False. If showDeleted and singleEvents are both True, only single instances of deleted events (but not the underlying recurring events) are returned. Optional. The default is False.
   */
  readonly showDeleted?: boolean;

  /**
   * Whether to include hidden invitations in the result. Optional. The default is False.
   */
  readonly showHiddenInvitations?: boolean;

  /**
   * Whether to expand recurring events into instances and only return single one-off events and instances of recurring events, but not the underlying recurring events themselves. Optional. The default is False.
   */
  readonly singleEvents?: boolean;

  /**
   * Token obtained from the nextSyncToken field returned on the last page of results from the previous list request. It makes the result of this list request contain only entries that have changed since then. All events deleted since the previous list request will always be in the result set and it is not allowed to set showDeleted to False.
   */
  readonly syncToken?: string;

  /**
   * Upper bound (exclusive) for an event's start time to filter by. Optional. The default is not to filter by start time. Must be an RFC3339 timestamp with mandatory time zone offset, for example, 2011-06-03T10:00:00-07:00, 2011-06-03T10:00:00Z. Milliseconds may be provided but are ignored. If timeMin is set, timeMax must be greater than timeMin.
   */
  readonly timeMax?: datetime;

  /**
   * Lower bound (exclusive) for an event's end time to filter by. Optional. The default is not to filter by end time. Must be an RFC3339 timestamp with mandatory time zone offset, for example, 2011-06-03T10:00:00-07:00, 2011-06-03T10:00:00Z. Milliseconds may be provided but are ignored. If timeMax is set, timeMin must be smaller than timeMax.
   */
  readonly timeMin?: datetime;

  /**
   * Time zone used in the response. Optional. The default is the time zone of the calendar.
   */
  readonly timeZone?: string;

  /**
   * Lower bound for an event's last modification time (as a RFC3339 timestamp) to filter by. When specified, entries deleted since this time will always be included regardless of showDeleted. Optional. The default is not to filter by last modification time.
   */
  readonly updatedMin?: datetime;
}

export type EventInsertBody = RequiredProperties<
  Omit<Event, 'kind' | 'etag' | 'id'>,
  'start' | 'end'
>;
