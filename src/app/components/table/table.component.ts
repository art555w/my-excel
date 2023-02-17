import {Component, ElementRef, Input, OnInit, ViewChild} from '@angular/core';

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
  @ViewChild('cell', {static: true})
  cell!: ElementRef
  @Input()
  amountRows = 20
  rows!: Array<any>
  cols!: Array<any>


  ngOnInit() {
    const cols = this.CODE.B - this.CODE.A + 1
    this.cols = new Array(cols)
      .fill('')
      .map((val, index) => this.CODE.A + index)

    this.rows = new Array(this.amountRows)
      .fill('')
  }

}
