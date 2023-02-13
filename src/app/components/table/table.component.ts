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
  rows!: Array<any>
  cols!: Array<any>


  ngOnInit() {
    const cols = this.CODE.B - this.CODE.A + 1
    this.cols = new Array(cols)
      .fill('')
      .map((_, index) => this.getCharCode(index))

    this.rows = new Array(this.amountRows)
      .fill('')
  }

  getCharCode(num: number): string {
    return String.fromCharCode(num + this.CODE.A)
  }

}
