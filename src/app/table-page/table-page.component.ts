import {Component, OnInit} from '@angular/core';
import {Store} from "@ngrx/store";
import {initState} from "../store/actions/excel.actions";

@Component({
  selector: 'app-table-page',
  templateUrl: './table-page.component.html',
  styleUrls: ['./table-page.component.scss']
})
export class TablePageComponent implements OnInit {

  constructor(private store: Store) {
  }

  ngOnInit() {
    this.store.dispatch(initState())
  }
}
