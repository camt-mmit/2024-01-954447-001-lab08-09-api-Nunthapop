import { HttpClient } from '@angular/common/http';
import { inject, Injectable, ResourceRef } from '@angular/core';
import { rxResource } from '@angular/core/rxjs-interop';
import { defer, Observable, switchMap } from 'rxjs';
import {
  Event,
  EventInsertBody,
  EventsList,
  EventsQueryParams,
} from '../models/events';
import { OauthService } from './oauth.service';

const defaultQueryParams: EventsQueryParams = {
  eventTypes: ['default', 'fromGmail'],
};

const serviceUrl =
  'https://www.googleapis.com/calendar/v3/calendars/primary/events';

@Injectable({
  providedIn: 'root',
})
export class EventService {
  private readonly http = inject(HttpClient);
  private readonly oauthService = inject(OauthService);
  getAll(
    queryParams: () => EventsQueryParams,
  ): ResourceRef<EventsList | undefined> {
    return rxResource({
      request: queryParams,

      loader: ({ request }) =>
        defer(() => this.oauthService.getAccessTokenHeaders()).pipe(
          switchMap((authorizationHeaders) =>
            this.http.get<EventsList>(serviceUrl, {
              headers: {
                ...authorizationHeaders,
              },
              params: {
                ...defaultQueryParams,
                timeMin: (() => {
                  const date = new Date();
                  date.setFullYear(date.getFullYear() - 1);

                  return date.toISOString();
                })(),
                ...request,
              },
            }),
          ),
        ),
    });
  }

  create(data: EventInsertBody): Observable<Event> {
    return defer(() => this.oauthService.getAccessTokenHeaders()).pipe(
      switchMap((authorizationHeaders) =>
        this.http.post<Event>(serviceUrl, data, {
          headers: {
            ...authorizationHeaders,
          },
        }),
      ),
    );
  }
}
