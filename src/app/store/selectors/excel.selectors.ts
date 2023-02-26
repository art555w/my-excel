import {createFeatureSelector, createSelector} from "@ngrx/store";
import {IInitialState} from "../state/excel.state";

export const featureSelectors = createFeatureSelector<IInitialState>('excel',)

export const colSelector = createSelector(
  featureSelectors,
  state => state.colState
)
export const rowSelector = createSelector(
  featureSelectors,
  state => state.rowState
)

