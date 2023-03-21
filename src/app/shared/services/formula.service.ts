import {Injectable} from '@angular/core';
import {Subject} from "rxjs";

import {SelectCellService} from "../select-cell/select-cell.service";

@Injectable({
  providedIn: 'root'
})
export class FormulaService {

  formulaInput$: Subject<string> = new Subject<string>()

  constructor(private selectCellService: SelectCellService) {
  }

  formulaInput(text: string) {
    this.formulaInput$.next(text)
  }

  formulaDone() {
    this.selectCellService.selectCell()
  }
}
