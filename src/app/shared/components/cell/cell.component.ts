import {Component, Input, OnInit} from '@angular/core';
import {Store} from "@ngrx/store";
import {IDefaultStyle} from "../../interface";

@Component({
  selector: 'app-cell',
  templateUrl: './cell.component.html',
  styleUrls: ['./cell.component.scss']
})
export class CellComponent implements OnInit {
  styles!: IDefaultStyle

  @Input()
  numCol!: number
  @Input()
  numRow!: number
  @Input()
  col!: string
  id = ''

  text = ''

  constructor(private store: Store) {
  }

  ngOnInit(): void {
    this.id = `${this.numCol}:${this.numRow}`
    this.styles = {
      height: '24px',
      width: '120px',
      'font-style': 'normal',
      'font-weight': 'normal',
      'text-align': 'left',
      'text-decoration': 'none'
    }
  }

}
