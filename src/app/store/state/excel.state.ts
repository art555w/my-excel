import {IStoreData} from "../../shared/interface";

export interface IInitialState {
  colState: IStoreData,
  rowState: IStoreData,
  updated: boolean,
  cellText: IStoreData,
  applyStyle: IStoreData,
  title: string
}

export const initialState: IInitialState = {
  title: 'Новая таблица',
  colState: {},
  rowState: {},
  cellText: {},
  applyStyle: {},
  updated: false
}
