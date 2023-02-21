import { TestBed } from '@angular/core/testing';

import { ResizeTableService } from './resize-table.service';

describe('ResizeTableService', () => {
  let service: ResizeTableService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ResizeTableService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
