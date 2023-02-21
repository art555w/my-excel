import { TestBed } from '@angular/core/testing';

import { SelectUtilsService } from './select-utils.service';

describe('SelectUtilsService', () => {
  let service: SelectUtilsService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(SelectUtilsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
