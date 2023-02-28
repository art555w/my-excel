import {createReducer, on} from "@ngrx/store";
import {initialState} from "../state/excel.state";
import {initState, resizeTable, textCell, updatedState} from "../actions/excel.actions";

let saveState
export const excelReducers = createReducer(
  initialState,
  on(updatedState, (state, action) => {
    const newState = action.initState || {}
    return {
      ...state,
      ...newState,
      updated: action.update,
    }
  }),
  on(resizeTable, (state, action) => {
    const type = action.resType === 'col' ? 'colState' : 'rowState'
    saveState = {...state[type], ...action.data}
    return {
      ...state,
      [type]: {...saveState}
    }
  }),
  on(textCell, (state, action) => {
    saveState = {...state.cellText, ...action.data}
    return {
      ...state,
      cellText: {...saveState}
    }
  }),
  on(initState, (state) => ({...state}))
)
