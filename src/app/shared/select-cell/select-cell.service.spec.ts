import { TestBed } from '@angular/core/testing';

import { SelectCellService } from './select-cell.service';

describe('SelectCellService', () => {
  let service: SelectCellService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(SelectCellService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
