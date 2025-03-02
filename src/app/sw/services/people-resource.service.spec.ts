import { TestBed } from '@angular/core/testing';

import { PeopleResourceService } from './people-resource.service';

describe('PeopleResourceService', () => {
  let service: PeopleResourceService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(PeopleResourceService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
