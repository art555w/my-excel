import {createReducer, on} from "@ngrx/store";
import {initialState} from "../state/excel.state";
import {colState, updateResolve} from "../actions/excel.actions";

export const excelReducer = createReducer(
  initialState,
  on(colState, (state, action) => {
    const saveSate = state.colState || {}
    return {
      ...state,
      colState: {...saveSate, ...action.data}
    }
  }),
  on(updateResolve, (state, action) => ({...state, updateAt: action.update}))
)
