import { Injectable, resource, ResourceRef } from '@angular/core';
import { apiURL } from '../helpers';
import { Person, ResourceList, SearchData } from '../models';
import { ResourceLoader } from '@angular/compiler';


const serviceUrl = `${apiURL}/people/`;
@Injectable({
  providedIn: 'root'
})
export class PeopleResourceService {
    getAll(searchData?: () => SearchData): ResourceRef<ResourceList<Person> | undefined>{
      return resource({
        request: searchData,
        loader: async ({request, abortSignal}): Promise<ResourceList<Person>> =>{
          const url = new URL(serviceUrl);

          if(typeof request !== 'undefined'){
            Object.entries(request).
            filter(([,value])=> !!value).forEach(([key,value])=> url.searchParams.set(key,value));

          }

          const res = await fetch(url);
          const json = await res.json();

          if(res.ok){
            return json;
          }
          throw new Error(`HTTP ERROR`, {cause: json})


        }
      });
    }
    get(id: ()=>string): ResourceRef<Person | undefined>{
      return resource({
        request: id,
        loader: async ({request, abortSignal}): Promise<Person> =>{
          const url = new URL(request,serviceUrl);



          const res = await fetch(url, {signal: abortSignal});
          const json = await res.json();

          if(res.ok){
            return json;
          }
          throw new Error(`HTTP ERROR`, {cause: json})

        }
      })
    }
}
