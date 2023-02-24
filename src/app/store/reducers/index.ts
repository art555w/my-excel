import {isDevMode} from '@angular/core';
import {ActionReducerMap, MetaReducer} from '@ngrx/store';
import {IExcelState} from "../state/excel.state";
import {excelReducers} from "./excel.reducers";

export interface State {
  excel: IExcelState
}

export const reducers: ActionReducerMap<State> = {
  excel: excelReducers
};


export const metaReducers: MetaReducer<State>[] = isDevMode() ? [] : [];
