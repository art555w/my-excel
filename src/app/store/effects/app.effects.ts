import {Injectable} from '@angular/core';
import {Actions, createEffect, ofType} from '@ngrx/effects';
import {resizeTable, styleState, textCell, titleState, updatedState} from "../actions/excel.actions";
import {map} from "rxjs";
import {Store} from "@ngrx/store";
import {StoreService} from "../store.service";

@Injectable()
export class AppEffects {
  updateState$ = createEffect(() => this.actions$.pipe(
    ofType(resizeTable, textCell, styleState, titleState),
    map((action) => {
      this.storeService.updateState()
      return updatedState({update: true})
    })
  ))
  // initState$ = createEffect(() => this.actions$.pipe(
  //   ofType(initState),
  //   map((action) => {
  //     return updatedState({
  //       update: true,
  //       initState: action.state
  //     })
  //   })
  // ))
  // createState$ = createEffect(() => this.actions$.pipe(
  //   ofType(createState),
  //   map((action) => {
  //     return updatedState({
  //       update: true,
  //       initState: {...this.storeService.getState(action.id)}
  //     })
  //   })
  // ))


  constructor(
    private actions$: Actions,
    private store: Store,
    private storeService: StoreService) {
  }
}
