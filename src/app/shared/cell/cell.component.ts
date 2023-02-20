import {Component, Input, OnInit} from '@angular/core';
import {SelectCellService} from "../services/select-cell.service";
import {SelectCellDirective} from "../directives/select-cell.directive";
import {FormulaService} from "../services/formula.service";

@Component({
  selector: 'app-cell',
  templateUrl: './cell.component.html',
  styleUrls: ['./cell.component.scss']
})
export class CellComponent implements OnInit {

  @Input() numRow = 0
  @Input() numCol = 0
  @Input() col = 0
  id = ''

  constructor(private formulaService: FormulaService) {
  }

  ngOnInit() {
    this.id = `${this.numCol}:${this.numRow}`
  }



}
