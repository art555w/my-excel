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

export const textSelector = createSelector(
  featureSelectors,
  state => state.cellText
)

export const stylesSelector = createSelector(
  featureSelectors,
  state => state.applyStyle
)
export const titleSelector = createSelector(
  featureSelectors,
  state => state.title
)

export const updateSelector = createSelector(
  featureSelectors,
  state => state.updated
)


