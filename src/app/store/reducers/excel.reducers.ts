import {createReducer, on} from "@ngrx/store";
import {colState, loadState, updatedAt} from "../actions/excel.actions";
import {initialState} from "../state/excel.state";

export const excelReducers = createReducer(
  initialState,
  on(colState, (state, action) => {
    const saveState = {...state.colState, ...action.data} || {}
    return {
      ...state,
      colState: {...saveState}
    }
  }),
  on(updatedAt, state => ({...state, updated: true})),
  on(loadState, (state, action) => {
    return {
      ...state,
      ...action.data
    }
  }),
)
