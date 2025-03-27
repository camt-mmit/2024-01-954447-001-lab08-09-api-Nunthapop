import { HttpClient } from '@angular/common/http';
import { inject, Injectable, Resource } from '@angular/core';
import { Observable } from 'rxjs';
import { Person, ResourceList, SearchData } from '../models';
import { apiURL } from '../helpers';

const serviceUrl = `${apiURL}/people/`;


@Injectable({
  providedIn: 'root'
})
export class PeopleHttpClientService {
  private readonly http = inject(HttpClient)

  getAll(searchData?: SearchData): Observable<ResourceList<Person>>{
    return this.http.get<ResourceList<Person>>(serviceUrl, {
      params: {...searchData},
    })
  }

  get(id: string): Observable<Person>{
    return this.http.get<Person>(`${serviceUrl}${id}`)
  }
}
