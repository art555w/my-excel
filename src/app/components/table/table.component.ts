import {Component, Input, OnInit} from '@angular/core';

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

  constructor() {
  }


  ngOnInit() {
    this.cols = new Array(this.amountCols)
      .fill('')
      .map((val, index) => this.CODE.A + index)

    this.rows = new Array(this.amountRows)
      .fill('')

  }

}
