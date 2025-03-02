import { OverrideProperties } from '../models';
import {
  Event,
  EventDate,
  EventDateAllDay,
  EventDateTime,
  EventsList,
} from '../models/events';
import { readonlyArray } from './common';

/**
 * Parser Functions
 */

export function isEventDateAllDay<
  DA extends OverrideProperties<EventDateAllDay, unknown>,
  DT extends OverrideProperties<EventDateTime, unknown>,
>(data: DA | DT | undefined): data is DA | undefined {
  return typeof (data as DA).date !== 'undefined';
}

export function isEventDateTime<
  DA extends OverrideProperties<EventDateAllDay, unknown>,
  DT extends OverrideProperties<EventDateTime, unknown>,
>(data: DA | DT | undefined): data is DT | undefined {
  return typeof (data as DT).dateTime !== 'undefined';
}

export function parseEventDate(data: EventDate) {
  if (isEventDateTime(data)) {
    const { dateTime, ...rest } = data;

    return {
      ...rest,
      dateTime: new Date(dateTime),
    } as const;
  } else {
    const { date, ...rest } = data;

    return {
      ...rest,
      date: new Date(`${date}T00:00:00`),
    } as const;
  }
}

export function parseEvent(data: Event) {
  const { start, end, ...rest } = data;

  function parseStartOrEnd(
    key: 'start',
    value: EventDate | undefined,
  ): {
    readonly start?: ReturnType<typeof parseEventDate>;
  };

  function parseStartOrEnd(
    key: 'end',
    value: EventDate | undefined,
  ): {
    readonly end?: ReturnType<typeof parseEventDate>;
  };

  function parseStartOrEnd(key: 'start' | 'end', value: EventDate | undefined) {
    if (typeof value === 'undefined') {
      return {};
    }

    return {
      [key]: {
        ...parseEventDate(value),
      } as const,
    } as const;
  }

  return {
    ...rest,
    ...parseStartOrEnd('start', start),
    ...parseStartOrEnd('end', end),
  } as const;
}

export function parseEventsList(data: EventsList) {
  return {
    ...data,
    items: readonlyArray((data?.items || []).map(parseEvent)),
  } as const;
}

// Utilities
export function getEventDateDateTime(
  eventDate: ReturnType<typeof parseEventDate>,
): {
  date: string;
  time: string | null;
} {
  const [date, time] = (
    isEventDateTime(eventDate) ?
      eventDate.dateTime
    : eventDate.date)
    .toISOString()
    .split('T');

  return { date, time: isEventDateAllDay(eventDate) ? null : time };
}

export function getEventDateString(
  eventDate: ReturnType<typeof parseEventDate>,
): string {
  if (isEventDateTime(eventDate)) {
    const { dateTime } = eventDate;

    return dateTime.toLocaleString(undefined, {
      dateStyle: 'medium',
      timeStyle: 'short',
    });
  } else {
    const { date } = eventDate;

    return date.toLocaleDateString(undefined, {
      dateStyle: 'medium',
    });
  }
}

export function getEventDateDateString(
  eventDate: ReturnType<typeof parseEventDate>,
): string {
  const date = isEventDateTime(eventDate) ? eventDate.dateTime : eventDate.date;

  return date.toLocaleDateString(undefined, { dateStyle: 'medium' });
}

export function getEventDateTimeString(
  eventDate: ReturnType<typeof parseEventDate>,
): string {
  const date = isEventDateTime(eventDate) ? eventDate.dateTime : eventDate.date;

  return date.toLocaleTimeString(undefined, { timeStyle: 'short' });
}

export function displayEventTimeRange(
  event: ReturnType<typeof parseEvent>,
): string {
  const { start, end } = event;

  if (start && end) {
    const startDateTime = getEventDateDateTime(start);
    const endDateTime = getEventDateDateTime(end);

    if (startDateTime.date === endDateTime.date) {
      if (startDateTime.time === endDateTime.time) {
        return getEventDateString(start);
      } else {
        return `${getEventDateString(start)} - ${getEventDateTimeString(end)}`;
      }
    } else {
      return `${getEventDateString(start)} to ${getEventDateString(end)}`;
    }
  } else if (start) {
    return getEventDateString(start);
  } else if (end) {
    return getEventDateString(end);
  } else {
    return 'Unknown';
  }
}
