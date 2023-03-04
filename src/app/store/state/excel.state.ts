import {IStoreData} from "../../shared/interface";

export interface IInitialState {
  colState: IStoreData,
  rowState: IStoreData,
  updated: boolean,
  cellText: IStoreData,
  applyStyle: IStoreData
}

export const initialState: IInitialState = {
  colState: {},
  rowState: {},
  cellText: {},
  applyStyle: {},
  updated: false
}
