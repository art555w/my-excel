import { TestBed } from '@angular/core/testing';

import { AllCellService } from './all-cell.service';

describe('AllCellService', () => {
  let service: AllCellService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(AllCellService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
