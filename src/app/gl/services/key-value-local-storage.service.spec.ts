import { TestBed } from '@angular/core/testing';

import { KeyValueLocalStorageService } from './key-value-local-storage.service';

describe('KeyValueLocalStorageService', () => {
  let service: KeyValueLocalStorageService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(KeyValueLocalStorageService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
