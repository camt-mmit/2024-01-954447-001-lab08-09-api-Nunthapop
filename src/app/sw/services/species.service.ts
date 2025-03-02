import { HttpClient } from '@angular/common/http';
import { inject, Injectable, Injector, ResourceRef } from '@angular/core';
import { rxResource } from '@angular/core/rxjs-interop';
import { fromEvent, take, takeUntil } from 'rxjs';
import { apiUrl } from '../helpers';
import { ResourcesList, SearchData, Species } from '../models';

const serviceUrl = `${apiUrl}/species/`;

@Injectable({
  providedIn: 'root',
})
export class SpeciesService {
  private readonly http = inject(HttpClient);

  getAll(
    searchData: () => SearchData,
    { injector = undefined as Injector | undefined } = {},
  ): ResourceRef<ResourcesList<Species> | undefined> {
    return rxResource({
      request: searchData,

      loader: ({ request, abortSignal }) =>
        this.http
          .get<ResourcesList<Species>>(serviceUrl, {
            params: { ...request },
          })
          .pipe(takeUntil(fromEvent(abortSignal, 'abort').pipe(take(1)))),

      injector: injector,
    });
  }

  get(
    id: () => string,
    { injector = undefined as Injector | undefined } = {},
  ): ResourceRef<Species | undefined> {
    return rxResource({
      request: id,

      loader: ({ request, abortSignal }) =>
        this.http
          .get<Species>(`${serviceUrl}${request}`)
          .pipe(takeUntil(fromEvent(abortSignal, 'abort').pipe(take(1)))),

      injector: injector,
    });
  }
}
