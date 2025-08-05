import { TestBed } from '@angular/core/testing';

import { GetDefaultListService } from './get-default-list.service';

describe('GetDefaultListService', () => {
  let service: GetDefaultListService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(GetDefaultListService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
