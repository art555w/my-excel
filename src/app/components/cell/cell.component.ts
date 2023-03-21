import {AfterViewInit, Component, ElementRef, Input, OnInit, ViewChild} from '@angular/core';
import {Store} from "@ngrx/store";

import {IDefaultStyle, IStoreData} from "../../shared/interface";
import {textSelector} from "../../store/selectors/excel.selectors";
import {AllCellService} from "../../shared/services/all-cell.service";

@Component({
  selector: 'app-cell',
  templateUrl: './cell.component.html',
  styleUrls: ['./cell.component.scss']
})
export class CellComponent implements OnInit, AfterViewInit {
  styles!: IDefaultStyle

  @Input()
  numCol!: number
  @Input()
  numRow!: number
  @Input()
  col!: string
  id = ''

  text = ''
  textSelector$ = this.store.select(textSelector)
  @ViewChild('cellRef')
  cellRef!: ElementRef

  constructor(
    private store: Store,
    private allCellService: AllCellService
  ) {
  }

  ngAfterViewInit() {
    this.allCellService.buildCells(this.cellRef)
  }

  ngOnInit(): void {
    this.id = `${this.numCol}:${this.numRow}`
    this.styles = {
      height: '24px',
      width: '120px',
      'font-style': 'normal',
      'font-weight': 'normal',
      'text-align': 'left',
      'text-decoration': 'none',
      color: '#000',
    }

    this.textSelector$
      .subscribe((data: IStoreData) => {
        if (data[this.id]) {
          this.text = data[this.id]
        }
      }).unsubscribe()
  }

}
