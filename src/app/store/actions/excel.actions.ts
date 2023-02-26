import {createAction, props} from "@ngrx/store";

export const resizeTable = createAction(
  '[Table State] Resize Table',
  props<{ data: {}, resType: string }>()
)
export const updatedState = createAction(
  '[Excel State] Update State',
  props<{ update: boolean, initState?: {} }>()
)
export const initState = createAction(
  '[State] Init State',
)
