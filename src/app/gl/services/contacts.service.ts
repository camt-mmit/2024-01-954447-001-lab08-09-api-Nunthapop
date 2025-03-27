import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { catchError, from, Observable, switchMap } from 'rxjs';
import {
  ConnectionsList,
  ConnectionsQueryParams,
  ContactCreateBody,
  ContactCreateQueryParams,
  Person,
} from '../models/contacts';
import { OauthService } from './oauth.service';

@Injectable({
  providedIn: 'root',
})
export class ContactsService {
  private http = inject(HttpClient);
  private oauthService = inject(OauthService);
  private apiUrl = 'https://people.googleapis.com/v1';

  private getHeaders(): Promise<{ Authorization: string }> {
    return this.oauthService.getAccessTokenHeaders();
  }

  getContacts(params: ConnectionsQueryParams): Observable<ConnectionsList> {
    return from(this.getHeaders()).pipe(
      switchMap((headers) =>
        this.http.get<ConnectionsList>(`${this.apiUrl}/people/me/connections`, {
          headers,
          params: params as any,
        }),
      ),
      catchError((err) => {
        throw new Error('Failed to fetch contacts: ' + err.message);
      }),
    );
  }

  createContact(
    body: ContactCreateBody,
    params?: ContactCreateQueryParams,
  ): Observable<Person> {
    return from(this.getHeaders()).pipe(
      switchMap((headers) =>
        this.http.post<Person>(`${this.apiUrl}/people:createContact`, body, {
          headers,
          params: params as any,
        }),
      ),
      catchError((err) => {
        throw new Error('Failed to create contact: ' + err.message);
      }),
    );
  }
}
