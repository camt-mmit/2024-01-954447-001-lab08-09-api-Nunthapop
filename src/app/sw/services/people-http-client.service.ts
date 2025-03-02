import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { apiUrl } from '../helpers';
import { Person, ResourcesList, SearchData } from '../models';

const serviceUrl = `${apiUrl}/people/`;

@Injectable({
  providedIn: 'root',
})
export class PeopleHttpClientService {
  private readonly http = inject(HttpClient);

  getAll(searchData?: SearchData): Observable<ResourcesList<Person>> {
    return this.http.get<ResourcesList<Person>>(serviceUrl, {
      params: { ...searchData },
    });
  }

  get(id: string): Observable<Person> {
    return this.http.get<Person>(`${serviceUrl}${id}`);
  }
}
