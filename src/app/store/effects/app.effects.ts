import {Injectable} from '@angular/core';
import {Actions, createEffect, ofType} from '@ngrx/effects';
import {updateResolve, updateStore} from "../actions/excel.actions";
import {map, mergeMap} from "rxjs";
import {StoreService} from "../store.service";

@Injectable()
export class AppEffects {
  updateStore$ = createEffect(() => this.actions$.pipe(
    ofType(updateStore),
    mergeMap(() => {
      return this.storeService.updateStore().pipe(
        map((pre) => {
          return updateResolve({update: pre})
        })
      )
    })
  ))

  constructor(private actions$: Actions, private storeService: StoreService) {
  }

}
