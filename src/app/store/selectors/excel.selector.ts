import {createFeatureSelector, createSelector} from "@ngrx/store";
import {IExcelState} from "../state/excel.state";

export const featureSelector = createFeatureSelector<IExcelState>('excel')

export const colStateSelector = createSelector(
  featureSelector,
  state => state.colState
)


export const colSelector = createSelector(
  featureSelector,
  state => state.colState
)
