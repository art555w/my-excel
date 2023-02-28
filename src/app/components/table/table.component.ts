import {AfterViewInit, ChangeDetectorRef, Component, OnDestroy, OnInit, QueryList, ViewChildren} from '@angular/core';
import {TableTemplateService} from "../../shared/services/table-template.service";
import {Store} from "@ngrx/store";
import {colSelector, rowSelector, textSelector} from "../../store/selectors/excel.selectors";
import {CellComponent} from "../../shared/components/cell/cell.component";
import {IStoreData} from "../../shared/interface";
import {ColComponent} from "../../shared/components/col/col.component";
import {SelectCellService} from "../../shared/select-cell/select-cell.service";
import {Subscription} from "rxjs";
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
  textSelector$ = this.store.select(textSelector)

  subCol!: Subscription
  subRow!: Subscription


  constructor(
    private tableTemplateService: TableTemplateService,
    private store: Store,
    private sel: SelectCellService,
    private changeDetector: ChangeDetectorRef,
    private tableService: TableService
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
    this.textSelector$.subscribe((data: IStoreData) => {
      this.cellsRef.forEach(el => {
        if (data[el.id]) {
          el.text = data[el.id]
        }
        if (data['1:1']) {
          this.tableService.tableInput(data['1:1'])
        }
      })
    }).unsubscribe()
  }

  ngOnDestroy() {
    if (this.subCol) {
      this.subCol.unsubscribe()
    }
    if (this.subRow) {
      this.subRow.unsubscribe()
    }
  }

}
