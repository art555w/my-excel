import { TestBed } from '@angular/core/testing';

import { ResizeUtilsService } from './resize-utils.service';

describe('ResizeUtilsService', () => {
  let service: ResizeUtilsService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ResizeUtilsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
