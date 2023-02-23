import {Component, OnInit} from '@angular/core';
import {StoreService} from "../../store/store.service";
import {Store} from "@ngrx/store";
import {updateStore} from "../../store/actions/excel.actions";

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {

  constructor(private storeService: StoreService, private store: Store) {
  }

  ngOnInit() {

  }

  updateStore() {
    this.store.dispatch(updateStore())
  }
}
