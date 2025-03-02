import { Injectable } from '@angular/core';
import { apiUrl } from '../helpers';
import { Person, ResourcesList, SearchData } from '../models';

const serviceUrl = `${apiUrl}/people/`;

@Injectable({
  providedIn: 'root',
})
export class PeopleFetchService {
  async getAll(searchData?: SearchData): Promise<ResourcesList<Person>> {
    const url = new URL(serviceUrl);

    if (typeof searchData !== 'undefined') {
      Object.entries(searchData)
        .filter(([, value]) => !!value)
        .forEach(([key, value]) => url.searchParams.set(key, value));
    }

    const res = await fetch(url);
    const json = await res.json();

    if (res.ok) {
      return json;
    }

    throw new Error('Http Error', { cause: json });
  }

  async get(id: string): Promise<Person> {
    const url = new URL(id, serviceUrl);

    const res = await fetch(url);
    const json = await res.json();

    if (res.ok) {
      return json;
    }

    throw new Error('Http Error', { cause: json });
  }
}
