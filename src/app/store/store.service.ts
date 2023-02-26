import {Injectable} from '@angular/core';
import {Store} from "@ngrx/store";
import {IInitialState, initialState} from "./state/excel.state";

@Injectable({
  providedIn: 'root'
})
export class StoreService {

  constructor(private store: Store) {
  }

  updateState() {
    this.store.subscribe((state) => {
      localStorage.setItem('excel', JSON.stringify(state))
    })
  }

  getState(): IInitialState {
    const prevState: string | null = localStorage.getItem('excel')
    let state: IInitialState = {...initialState}
    if (prevState) {
      state = {
        ...state,
        ...JSON.parse(prevState)['excel']
      }
    }
    return state
  }
}
