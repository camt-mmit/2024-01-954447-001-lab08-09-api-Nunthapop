import { HttpClient } from '@angular/common/http';
import { inject, Injectable, Injector, ResourceRef } from '@angular/core';
import { rxResource } from '@angular/core/rxjs-interop';
import { fromEvent, take, takeUntil } from 'rxjs';
import { apiUrl } from '../helpers';
import { Planet, ResourcesList, SearchData } from '../models';

const serviceUrl = `${apiUrl}/planets/`;

@Injectable({
  providedIn: 'root',
})
export class PlanetsService {
  private readonly http = inject(HttpClient);

  getAll(
    searchData: () => SearchData,
    { injector = undefined as Injector | undefined } = {},
  ): ResourceRef<ResourcesList<Planet> | undefined> {
    return rxResource({
      request: searchData,

      loader: ({ request, abortSignal }) =>
        this.http
          .get<ResourcesList<Planet>>(serviceUrl, {
            params: { ...request },
          })
          .pipe(takeUntil(fromEvent(abortSignal, 'abort').pipe(take(1)))),

      injector: injector,
    });
  }

  get(
    id: () => string,
    { injector = undefined as Injector | undefined } = {},
  ): ResourceRef<Planet | undefined> {
    return rxResource({
      request: id,

      loader: ({ request, abortSignal }) =>
        this.http
          .get<Planet>(`${serviceUrl}${request}`)
          .pipe(takeUntil(fromEvent(abortSignal, 'abort').pipe(take(1)))),

      injector: injector,
    });
  }
}
