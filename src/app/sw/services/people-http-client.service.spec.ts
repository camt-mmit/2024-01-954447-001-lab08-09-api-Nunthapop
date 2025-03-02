import { TestBed } from '@angular/core/testing';

import { PeopleHttpClientService } from './people-http-client.service';

describe('PeopleHttpClientService', () => {
  let service: PeopleHttpClientService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(PeopleHttpClientService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
