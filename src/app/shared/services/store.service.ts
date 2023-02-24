import {Injectable} from '@angular/core';
import {Store} from "@ngrx/store";

@Injectable({
  providedIn: 'root'
})
export class StoreService {

  constructor(private store: Store) {
  }

  updateState() {
    this.store.subscribe(state => {
      console.log('save')
      localStorage.setItem('excel', JSON.stringify(state))
    }).unsubscribe()
  }

  initialState() {
    const state = localStorage.getItem('excel')
    if (state !== null) {
      return JSON.parse(state).excel
    }
  }
}
