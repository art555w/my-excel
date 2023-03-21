import {Injectable} from '@angular/core';
import {Store} from "@ngrx/store";
import {map, Observable, skip, switchMap} from "rxjs";
import {HttpClient} from "@angular/common/http";

import {IInitialState} from "../../store/state/excel.state";
import {environment} from "../../../environments/environment";
import {IFbCreateResponse, IStoreData} from "../../shared/interface";

@Injectable({
  providedIn: 'root'
})
export class StoreService {

  id = ''
  user = ''
  update = false
  loading = false

  constructor(
    private store: Store,
    private http: HttpClient,
  ) {
  }

  getById(id: string): Observable<IInitialState> {
    this.id = id
    this.user = localStorage.getItem('fb-localId') || ''
    this.loading = true
    return this.http.get<IInitialState>(`${environment.fbDbUrl}/store/${this.user}/${id}.json`)
  }

  getAll(): Observable<IInitialState[]> {
    this.user = localStorage.getItem('fb-localId') || ''
    return this.http.get<IInitialState[]>(`${environment.fbDbUrl}/store/${this.user}.json`).pipe(
      map((res: { [key: string]: any }) => {
        if (res) {
          return Object.keys(res).map(key => {
            return res[key]
          })
        }
        return res
      })
    )
  }

  remove(id: string): Observable<any> {
    return this.http.delete(`${environment.fbDbUrl}/store/${this.user}/${id}.json`)
  }

  updateState(): Observable<any> {
    this.user = localStorage.getItem('fb-localId') || ''
    return this.store.pipe(
      skip(2),
      switchMap((state: IStoreData) => {
        this.update = true
        return this.http.put(`${environment.fbDbUrl}/store/${this.user}/${this.id}.json`, state['excel'])
      })
    )
  }

  createState(state: IInitialState): Observable<IInitialState> {
    this.user = localStorage.getItem('fb-localId') || ''
    return this.http.post<IFbCreateResponse>(`${environment.fbDbUrl}/store/${this.user}.json`, state).pipe(
      map((response) => {
        this.id = response.name
        const newState = {
          ...state,
          id: response.name,
        }
        return newState
      })
    )
  }


}
