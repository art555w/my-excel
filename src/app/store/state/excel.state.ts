import {IStoreData} from "../../shared/interface";

export interface IInitialState {
  id: string
  colState: IStoreData,
  rowState: IStoreData,
  updated: boolean,
  cellText: IStoreData,
  applyStyle: IStoreData,
  title: string,
  date?: Date,
}

export const initialState: IInitialState = {
  id: '',
  title: 'Новая таблица',
  colState: {},
  rowState: {},
  cellText: {},
  applyStyle: {},
  updated: false,
}
