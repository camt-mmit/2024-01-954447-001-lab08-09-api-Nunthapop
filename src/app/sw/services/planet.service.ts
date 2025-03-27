import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { map, Observable } from 'rxjs';
import { parsePlanet, parsePlanetsList } from '../helpers';
import { Planet } from '../models';

@Injectable({
  providedIn: 'root',
})
export class PlanetService {
  private http = inject(HttpClient);
  private baseUrl = 'https://swapi.dev/api/planets/';

  getPlanetsList(pageUrl?: string): Observable<{
    results: Planet[];
    next: string | null;
    previous: string | null;
  }> {
    const url = pageUrl || this.baseUrl;
    return this.http.get(url).pipe(
      map((data: any) => ({
        results: parsePlanetsList(data),
        next: data.next,
        previous: data.previous,
      })),
    );
  }

  getPlanet(id: number): Observable<Planet> {
    return this.http
      .get(`${this.baseUrl}${id}/`)
      .pipe(map((data: any) => parsePlanet(data)));
  }
}
