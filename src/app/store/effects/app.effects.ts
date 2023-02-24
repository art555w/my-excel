import {Injectable} from '@angular/core';
import {Actions, createEffect, ofType} from '@ngrx/effects';
import {colState, initState, loadState, updatedAt} from "../actions/excel.actions";
import {map} from "rxjs";
import {StoreService} from "../../shared/services/store.service";

@Injectable()
export class AppEffects {
  updateStore$ = createEffect(() => this.actions$.pipe(
    ofType(colState),
    map(() => {
      this.storeService.updateState()
      return updatedAt()
    })
  ))

  initState$ = createEffect(() => this.actions$.pipe(
    ofType(initState),
    map(() => {
      const state = this.storeService.initialState()
      return loadState({
        data: {...state}
      })
    })
  ))

  constructor(private actions$: Actions, private storeService: StoreService) {
  }
}
