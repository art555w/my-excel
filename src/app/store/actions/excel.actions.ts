import {createAction, props} from "@ngrx/store";
import {IStoreData} from "../../shared/interface";

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
export const styleState = createAction(
  '[Excel State] Apply Style',
  props<{ data: IStoreData }>()
)

