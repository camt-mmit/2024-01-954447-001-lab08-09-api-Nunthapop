import { Injectable, resource, ResourceRef } from '@angular/core';
import { apiUrl } from '../helpers';
import { Person, ResourcesList, SearchData } from '../models';

const serviceUrl = `${apiUrl}/people/`;

@Injectable({
  providedIn: 'root',
})
export class PeopleResourceService {
  getAll(
    searchData: () => SearchData,
  ): ResourceRef<ResourcesList<Person> | undefined> {
    return resource({
      request: searchData,

      loader: async ({ request: searchData, abortSignal }) => {
        const url = new URL(serviceUrl);

        if (typeof searchData !== 'undefined') {
          Object.entries(searchData)
            .filter(([, value]) => !!value)
            .forEach(([key, value]) => url.searchParams.set(key, value));
        }

        const res = await fetch(url, { signal: abortSignal });
        const json = await res.json();

        if (res.ok) {
          return json as ResourcesList<Person>;
        }

        throw new Error('Http Error', { cause: json });
      },
    });
  }

  get(id: () => string): ResourceRef<Person | undefined> {
    return resource({
      request: id,

      loader: async ({ request: id, abortSignal }) => {
        const url = new URL(id, serviceUrl);

        const res = await fetch(url, { signal: abortSignal });
        const json = await res.json();

        if (res.ok) {
          return json as Person;
        }

        throw new Error('Http Error', { cause: json });
      },
    });
  }
}
