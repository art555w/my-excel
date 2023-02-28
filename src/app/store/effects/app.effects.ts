import {Injectable} from '@angular/core';
import {Actions, createEffect, ofType} from '@ngrx/effects';
import {initState, resizeTable, textCell, updatedState} from "../actions/excel.actions";
import {map} from "rxjs";
import {Store} from "@ngrx/store";
import {StoreService} from "../store.service";

@Injectable()
export class AppEffects {
  updateState$ = createEffect(() => this.actions$.pipe(
    ofType(resizeTable, textCell),
    map(() => {
      this.storeService.updateState()
      return updatedState({update: true})
    })
  ))
  initState$ = createEffect(() => this.actions$.pipe(
    ofType(initState),
    map(() => {
      return updatedState({
        update: true,
        initState: {...this.storeService.getState()}
      })
    })
  ))


  constructor(
    private actions$: Actions,
    private store: Store,
    private storeService: StoreService) {
  }
}
