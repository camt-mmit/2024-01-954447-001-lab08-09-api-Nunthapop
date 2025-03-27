import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { map, Observable } from 'rxjs';
import { parseSpecies, parseSpeciesList } from '../helpers';
import { Species } from '../models';

@Injectable({
  providedIn: 'root',
})
export class SpeciesServiceService {
  private http = inject(HttpClient);
  private baseUrl = 'https://swapi.dev/api/species/';

  getSpeciesList(pageUrl?: string): Observable<{
    results: Species[];
    next: string | null;
    previous: string | null;
  }> {
    const url = pageUrl || this.baseUrl;
    return this.http.get(url).pipe(
      map((data: any) => ({
        results: parseSpeciesList(data),
        next: data.next,
        previous: data.previous,
      })),
    );
  }

  getSpecies(id: number): Observable<Species> {
    return this.http.get(`${this.baseUrl}${id}/`).pipe(
      map((data: any) => {
        console.log('Raw API Data:', data); // ✅ Debug API Response
        return parseSpecies(data);
      }),
    );
  }
}
