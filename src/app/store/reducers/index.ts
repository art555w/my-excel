import {isDevMode} from '@angular/core';
import {ActionReducerMap, MetaReducer} from '@ngrx/store';
import {IExcelState} from "../state/excel.state";
import {excelReducer} from "./excel.reducer";

export interface State {
  excel: IExcelState
}

export const reducers: ActionReducerMap<State> = {
  excel: excelReducer
};


export const metaReducers: MetaReducer<State>[] = isDevMode() ? [] : [];
