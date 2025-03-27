import { Injectable } from '@angular/core';
import { apiURL } from '../helpers';
import { Person, ResourceList, SearchData } from '../models';

const serviceUrl = `${apiURL}/people/`;

@Injectable({
  providedIn: 'root'
})
export class PeopleFetchService {
  async getAll(searchData?: SearchData): Promise<ResourceList<Person>> {
    const url = new URL(serviceUrl);

    if(typeof searchData !== 'undefined'){
      Object.entries(searchData).
      filter(([,value])=> !!value).forEach(([key,value])=> url.searchParams.set(key,value));

    }

    const res = await fetch(url);
    const json = await res.json();

    if(res.ok){
      return json;
    }
    throw new Error(`HTTP ERROR`, {cause: json})
  }
  async  get(id: string): Promise<Person> {

    const url = new URL(id,serviceUrl);

    const res = await fetch(url);
    const json = await res.json();

    if(res.ok){
      return json;
    }
    throw new Error(`HTTP ERROR`, {cause: json})
  }
}
