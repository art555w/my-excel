import {Injectable} from '@angular/core';
import {Store} from "@ngrx/store";
import {IInitialState} from "./state/excel.state";
import {HttpClient} from "@angular/common/http";
import {environment} from "../../environments/environment";
import {map, Observable, skip, switchMap} from "rxjs";
import {IFbCreateResponse, IStoreData} from "../shared/interface";

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

  createState(user: string, state: IInitialState): Observable<IInitialState> {
    return this.http.post<IFbCreateResponse>(`${environment.fbDbUrl}/store/${user}.json`, state).pipe(
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
