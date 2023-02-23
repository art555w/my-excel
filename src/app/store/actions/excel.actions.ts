import {createAction, props} from "@ngrx/store";

export const colState = createAction(
  '[EXCEL] col State',
  props<{ data: {} }>()
)
export const rowState = createAction(
  '[EXCEL] row State',
  props<{ data: {} }>()
)

export const updateStore = createAction(
  '[EXCEL] update store',
)
export const updateResolve = createAction(
  '[EXCEL] update resolve',
  props<{ update: boolean }>()
)
