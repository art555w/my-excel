import {Injectable} from '@angular/core';
import {Store} from "@ngrx/store";
import {Observable, of, Subscription} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class StoreService {

  subUp!: Subscription

  constructor(private store: Store) {
  }

  updateStore(): Observable<boolean> {
    this.subUp = this.store.subscribe(state => {
      console.log('save')
      localStorage.setItem('excel', JSON.stringify(state))
    })
    return of(true)
  }


}
