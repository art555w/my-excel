import {createAction, props} from "@ngrx/store";
import {IStoreData} from "../../shared/interface";

export const resizeTable = createAction(
  '[Excel State] Resize Table',
  props<{ data: {}, changeType: string }>()
)
export const updatedState = createAction(
  '[Excel State] Update State',
  props<{ update: boolean }>()
)
export const textCell = createAction(
  '[Excel state] Update Text Cells',
  props<{ data: {} }>()
)
export const initState = createAction(
  '[Excel State] Init State',
  props<{ state: {} }>()
)
export const styleState = createAction(
  '[Excel State] Apply Style',
  props<{ data: IStoreData }>()
)
export const titleState = createAction(
  '[Excel State] Title State',
  props<{ text: string }>()
)

