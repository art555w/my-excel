import {AfterViewInit, Component, OnDestroy, OnInit, QueryList, ViewChildren} from '@angular/core';
import {Subscription} from "rxjs";
import {Store} from "@ngrx/store";

import {TableTemplateService} from "../../shared/services/table-template.service";
import {colSelector, rowSelector, stylesSelector} from "../../store/selectors/excel.selectors";
import {CellComponent} from "../cell/cell.component";
import {IStoreData} from "../../shared/interface";
import {ColComponent} from "../col/col.component";
import {SelectCellService} from "../../shared/select-cell/select-cell.service";
import {TableService} from "../../shared/services/table.service";

@Component({
  selector: 'app-table',
  templateUrl: './table.component.html',
  styleUrls: ['./table.component.scss']
})
export class TableComponent implements OnInit, AfterViewInit, OnDestroy {
  cols: number[] = []
  rows: string[] = []
  @ViewChildren('cellRef')
  cellsRef!: QueryList<CellComponent>
  @ViewChildren('colRef')
  colsRef!: QueryList<ColComponent>
  colSelector$ = this.store.select(colSelector)
  rowSelector$ = this.store.select(rowSelector)
  styleSelector$ = this.store.select(stylesSelector)

  subCol!: Subscription
  subRow!: Subscription
  subStyle!: Subscription


  constructor(
    private tableTemplateService: TableTemplateService,
    private store: Store,
    private selectCellService: SelectCellService,
    private tableService: TableService,
  ) {
  }

  ngOnInit() {
    this.cols = this.tableTemplateService.getCols()
    this.rows = this.tableTemplateService.getRows()
  }

  ngAfterViewInit() {
    this.subCol = this.colSelector$.subscribe((data: IStoreData) => {
      this.cellsRef.forEach(el => {
        if (data[el.col]) {
          el.styles.width = data[el.col] + 'px'
        }
      })
      this.colsRef.forEach(el => {
        if (data[el.col]) {
          el.colWidth.width = data[el.col] + 'px'
        }
      })
    })
    this.subRow = this.rowSelector$.subscribe((data: IStoreData) => {
      this.cellsRef.forEach(el => {
        if (data[el.numRow]) {
          el.styles.height = data[el.numRow] + 'px'
        }
      })
    })
    this.subStyle = this.styleSelector$.subscribe((data) => {
      this.cellsRef.forEach(el => {
        if (data[el.id]) {
          el.styles = {...el.styles, ...data[el.id]}
        }
      })
    })
    this.cellsRef.forEach(el => {
      if (el.id === '1:1') {
        this.tableService.applyStyle(el.styles)
        this.selectCellService.selectCell(el.id)
      }
    })
  }

  ngOnDestroy() {
    if (this.subCol) this.subCol.unsubscribe()
    if (this.subRow) this.subRow.unsubscribe()
    if (this.subStyle) this.subStyle.unsubscribe()
  }

  onEvent(event: MouseEvent | KeyboardEvent) {
    if (!event.shiftKey) {
      const id = this.selectCellService.currentId
      this.cellsRef.forEach(cell => {
        if (cell.id === id) this.tableService.applyStyle(cell.styles)
      })
    }
  }
}
