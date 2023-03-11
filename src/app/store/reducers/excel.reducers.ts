import {createReducer, on} from "@ngrx/store";
import {initialState} from "../state/excel.state";
import {initState, resizeTable, styleState, textCell, titleState, updatedState} from "../actions/excel.actions";

let saveState
export const excelReducers = createReducer(
  initialState,
  on(updatedState, (state, action) => {
    return {
      ...state,
      updated: action.update,
    }
  }),
  on(resizeTable, (state, action) => {
    const type = action.changeType === 'col' ? 'colState' : 'rowState'
    saveState = {...state[type], ...action.data}
    return {
      ...state,
      [type]: {...saveState},
      updated: false
    }
  }),
  on(textCell, (state, action) => {
    saveState = {...state.cellText, ...action.data}
    return {
      ...state,
      cellText: {...saveState},
      updated: false
    }
  }),
  on(initState, (state, action) => {
    return {
      ...state,
      ...action.state,
      date: new Date()
    }
  }),
  on(styleState, (state, action) => {
    let style = {}
    saveState = {...state.applyStyle, ...action.data}
    Object.keys(state.applyStyle).forEach((key: string) => {
      if (action.data[key]) {
        const prev = {...state.applyStyle[key], ...action.data[key]}
        style = {...state.applyStyle, [key]: prev}
      }
    })
    return {
      ...state,
      applyStyle: {...saveState, ...style},
      updated: false
    }
  }),
  on(titleState, (state, action) => {
    return {
      ...state,
      title: action.text,
      updated: false
    }
  }),
)
