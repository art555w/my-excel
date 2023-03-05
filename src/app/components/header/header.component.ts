import {Component, OnInit} from '@angular/core';
import {Store} from "@ngrx/store";
import {updateSelector} from "../../store/selectors/excel.selectors";

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {

  updateSelector$ = this.store.select(updateSelector)

  constructor(private store: Store) {
  }

  ngOnInit() {
  }

}
