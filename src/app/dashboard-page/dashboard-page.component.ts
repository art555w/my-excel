import {Component, OnDestroy, OnInit} from '@angular/core';
import {Router} from "@angular/router";
import {Subscription} from "rxjs";
import {Store} from "@ngrx/store";

import {AuthService} from "../database/services/auth.service";
import {StoreService} from "../database/services/store.service";
import {IInitialState, initialState} from "../store/state/excel.state";
import {initState} from "../store/actions/excel.actions";
import {AllCellService} from "../shared/services/all-cell.service";

@Component({
  selector: 'app-dashboard-page',
  templateUrl: './dashboard-page.component.html',
  styleUrls: ['./dashboard-page.component.scss']
})
export class DashboardPageComponent implements OnInit, OnDestroy {
  subCreate!: Subscription
  subUpdate!: Subscription

  tables: IInitialState[] = []
  load = true

  constructor(
    public authService: AuthService,
    public storeService: StoreService,
    private router: Router,
    private store: Store,
    private allCellService: AllCellService
  ) {
  }

  ngOnInit() {
    this.allCellService.cells = []
    if (this.authService.isAuthenticated()) {
      this.subUpdate = this.storeService.updateState().subscribe((state) => {
        this.router.navigate(['/table', state.id])
      })
      this.storeService.getAll().subscribe(tables => {
        this.tables = tables
        this.load = false
      })
    }
  }

  ngOnDestroy() {
    if (this.subCreate) {
      this.subCreate.unsubscribe()
    }
    if (this.subUpdate) {
      this.subUpdate.unsubscribe()
    }
  }

  create(event: MouseEvent) {
    this.storeService.loading = true
    const state: IInitialState = initialState
    this.subCreate = this.storeService.createState(state).subscribe((state) => {
      this.store.dispatch(initState({state}))
      this.storeService.loading = true
    })
  }

  onClick(id: string) {
    this.router.navigate(['/table', id])
  }

  remove(id: string) {
    this.storeService.remove(id).subscribe(() => {
      this.tables = this.tables.filter(table => table.id !== id)
    })
  }
}
