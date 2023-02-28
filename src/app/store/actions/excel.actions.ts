import {createAction, props} from "@ngrx/store";

export const resizeTable = createAction(
  '[Excel State] Resize Table',
  props<{ data: {}, resType: string }>()
)
export const updatedState = createAction(
  '[Excel State] Update State',
  props<{ update: boolean, initState?: {} }>()
)
export const textCell = createAction(
  '[Excel state] Update Text Cells',
  props<{ data: {} }>()
)
export const initState = createAction(
  '[Excel State] Init State',
)

