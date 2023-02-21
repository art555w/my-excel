import {Injectable, Input} from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class TableTemplateService {
  CODE = {
    A: 65,
    B: 90
  }
  @Input()
  amountRows = 10
  amountCols = this.CODE.B - this.CODE.A + 1
  rows!: Array<any>
  cols!: Array<any>

  constructor() {
  }

  getCols(): number[] {
    return this.cols = new Array(this.amountCols)
      .fill('')
      .map((val, index) => this.CODE.A + index)
  }

  getRows(): string[] {
    return this.rows = new Array(this.amountRows)
      .fill('')
  }
}
