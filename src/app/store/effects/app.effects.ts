import {Injectable} from '@angular/core';
import {Actions, createEffect, ofType} from '@ngrx/effects';
import {initState, resizeTable, styleState, textCell, titleState, updatedState} from "../actions/excel.actions";
import {map} from "rxjs";
import {Store} from "@ngrx/store";
import {StoreService} from "../../database/services/store.service";

@Injectable()
export class AppEffects {
  updateState$ = createEffect(() => this.actions$.pipe(
    ofType(resizeTable, textCell, styleState, titleState, initState),
    map((action) => {
      this.storeService.updateState()
      return updatedState({update: true})
    })
  ))

  constructor(
    private actions$: Actions,
    private store: Store,
    private storeService: StoreService) {
  }
}
