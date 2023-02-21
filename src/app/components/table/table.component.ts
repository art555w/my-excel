import {Component, Input, OnInit} from '@angular/core';
import {TableTemplateService} from "../../shared/services/table-template.service";

@Component({
  selector: 'app-table',
  templateUrl: './table.component.html',
  styleUrls: ['./table.component.scss']
})
export class TableComponent implements OnInit {

  cols: number[] = []
  rows: string[] = []

  constructor(private tableTemplateService: TableTemplateService) {
  }

  ngOnInit() {
    this.cols = this.tableTemplateService.getCols()
    this.rows = this.tableTemplateService.getRows()
  }

}
