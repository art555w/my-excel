import {AfterViewInit, Component, OnInit, QueryList, ViewChildren} from '@angular/core';
import {TableTemplateService} from "../../shared/services/table-template.service";
import {Store} from "@ngrx/store";
import {colSelector, rowSelector} from "../../store/selectors/excel.selectors";
import {CellComponent} from "../../shared/components/cell/cell.component";
import {IStoreData} from "../../shared/interface";
import {ColComponent} from "../../shared/components/col/col.component";

@Component({
  selector: 'app-table',
  templateUrl: './table.component.html',
  styleUrls: ['./table.component.scss']
})
export class TableComponent implements OnInit, AfterViewInit {
  cols: number[] = []
  rows: string[] = []
  @ViewChildren('cellRef')
  cellRef!: QueryList<CellComponent>
  @ViewChildren('colRef')
  colRef!: QueryList<ColComponent>
  colSelector$ = this.store.select(colSelector)
  rowSelector$ = this.store.select(rowSelector)


  constructor(private tableTemplateService: TableTemplateService, private store: Store) {
  }

  ngAfterViewInit() {
    this.colSelector$.subscribe((data: IStoreData) => {
      this.cellRef.forEach(el => {
        if (data[el.col]) {
          el.styles.width = data[el.col] + 'px'
        }
      })
      this.colRef.forEach(el => {
        if (data[el.col]) {
          el.colWidth.width = data[el.col] + 'px'
        }
      })
    })

    this.rowSelector$.subscribe((data: IStoreData) => {
      this.cellRef.forEach(el => {
        if (data[el.numRow]) {
          el.styles.height = data[el.numRow] + 'px'
        }
      })
    })
  }

  ngOnInit() {
    this.cols = this.tableTemplateService.getCols()
    this.rows = this.tableTemplateService.getRows()
  }


}
