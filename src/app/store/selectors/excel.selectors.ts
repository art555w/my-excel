import {createFeatureSelector, createSelector} from "@ngrx/store";
import {IExcelState} from "../state/excel.state";

export const featureSelector = createFeatureSelector<IExcelState>('excel')
export const colsSelector = createSelector(
  featureSelector,
  state => state.colState
)
