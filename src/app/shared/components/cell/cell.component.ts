import {Component, ElementRef, Input, OnInit, QueryList, ViewChildren} from '@angular/core';
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

  @ViewChildren('cell')
  elRef!: QueryList<ElementRef>

  constructor(private store: Store) {
  }

  ngOnInit(): void {
    this.id = `${this.numCol}:${this.numRow}`
    this.styles = {
      height: '24px',
      width: '120px'
    }
  }

}
