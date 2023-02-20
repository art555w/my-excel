import { TestBed } from '@angular/core/testing';

import { CellStateService } from './cell-state.service';

describe('CellStateService', () => {
  let service: CellStateService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CellStateService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
