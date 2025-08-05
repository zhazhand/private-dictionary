import { TestBed } from '@angular/core/testing';

import { CommonCRUDService } from './common-crud.service';

describe('CommonCRUDService', () => {
  let service: CommonCRUDService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CommonCRUDService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
