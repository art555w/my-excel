import {createAction, props} from "@ngrx/store";

export const colState = createAction(
  '[EXCEL] col state',
  props<{ data: { [key: string]: any } }>()
)
export const updatedAt = createAction(
  '[EXCEL] updated store',
)

export const initState = createAction(
  '[EXCEL] init',
)
export const loadState = createAction(
  '[EXCEL] loading State',
  props<{ data: { [key: string]: any } }>(),
)
