import {Component, ElementRef, EventEmitter, Input, OnInit, Output, ViewChild} from '@angular/core';
import {FormulaService} from "../../shared/services/formula.service";
import {SelectCellService} from "../../shared/services/select-cell.service";
import {AllCellService} from "../../shared/services/all-cell.service";

@Component({
  selector: 'app-table',
  templateUrl: './table.component.html',
  styleUrls: ['./table.component.scss']
})
export class TableComponent implements OnInit {

  CODE = {
    A: 65,
    B: 90
  }
  @Input()
  amountRows = 20
  amountCols = this.CODE.B - this.CODE.A + 1
  rows!: Array<any>
  cols!: Array<any>

  constructor(private formulaService: FormulaService, private selectCellService: SelectCellService, private all: AllCellService) {
  }


  ngOnInit() {
    this.cols = new Array(this.amountCols)
      .fill('')
      .map((val, index) => this.CODE.A + index)

    this.rows = new Array(this.amountRows)
      .fill('')


    this.formulaService.formText.subscribe((text) => {
      this.selectCellService.current.nativeElement.textContent = text
    })
  }

  onKeydown() {
    const text = this.selectCellService.current.nativeElement.textContent
    this.formulaService.cellInput(text)
  }
}
