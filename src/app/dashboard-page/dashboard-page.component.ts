import {Component, OnDestroy, OnInit} from '@angular/core';
import {AuthService} from "../database/services/auth.service";
import {StoreService} from "../store/store.service";
import {IInitialState, initialState} from "../store/state/excel.state";
import {Router} from "@angular/router";
import {Subscription} from "rxjs";
import {Store} from "@ngrx/store";
import {initState} from "../store/actions/excel.actions";

@Component({
  selector: 'app-dashboard-page',
  templateUrl: './dashboard-page.component.html',
  styleUrls: ['./dashboard-page.component.scss']
})
export class DashboardPageComponent implements OnInit, OnDestroy {
  auth = false
  user = ''
  subCreate!: Subscription

  constructor(
    public authService: AuthService,
    private storeService: StoreService,
    private router: Router,
    private store: Store
  ) {
  }

  ngOnInit() {
    this.storeService.updateState().subscribe(state => {
      if (state.id) {
        this.router.navigate([`/table/${state['id']}`])
      }
    })
  }

  ngOnDestroy() {
    if (this.subCreate) {
      this.subCreate.unsubscribe()
    }
  }

  create(event: MouseEvent) {
    if (!this.authService.isAuthenticated()) {
      this.auth = true
    }
    this.user = localStorage.getItem('fb-localId') || ''
    const state: IInitialState = initialState
    if (this.user) {
      this.subCreate = this.storeService.createState(this.user, state).subscribe((state) => {
        this.store.dispatch(initState({state}))
      })
    }
  }
}
