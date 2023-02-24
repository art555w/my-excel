import {Component, OnInit} from '@angular/core';
import {TableTemplateService} from "../../shared/services/table-template.service";
import {Store} from "@ngrx/store";

@Component({
  selector: 'app-table',
  templateUrl: './table.component.html',
  styleUrls: ['./table.component.scss']
})
export class TableComponent implements OnInit {

  cols: number[] = []
  rows: string[] = []


  constructor(private tableTemplateService: TableTemplateService, private store: Store) {
  }

  ngOnInit() {
    this.cols = this.tableTemplateService.getCols()
    this.rows = this.tableTemplateService.getRows()
  }

}
