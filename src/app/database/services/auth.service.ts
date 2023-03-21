import {Injectable} from '@angular/core';
import {catchError, Observable, Subject, switchMap, tap, throwError} from "rxjs";
import {HttpClient, HttpErrorResponse} from "@angular/common/http";

import {environment} from "../../../environments/environment";
import {IFbAuthResponse, IUser} from "../../shared/interface";

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  error$: Subject<string> = new Subject<string>()

  constructor(private http: HttpClient) {
  }

  get token() {
    const expDate = new Date(JSON.stringify(localStorage.getItem('fb-expDate')))

    if (new Date() > expDate) {
      this.logout()
    }
    return localStorage.getItem('fb-token')
  }

  login(user: IUser): Observable<any> {
    user.returnSecureToken = true
    return this.http.post<IFbAuthResponse>(`https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=${environment.apiKey}`, user)
      .pipe(
        tap(this.setToken),
        catchError(this.handleError.bind(this))
      )
  }

  registration(user: IUser): Observable<any> {
    user.returnSecureToken = true
    return this.http.post(`https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=${environment.apiKey}`, user)
      .pipe(
        switchMap(() => {
          return this.login(user)
        }),
        catchError((this.handleError.bind(this)))
      )
  }

  handleError(error: HttpErrorResponse): Observable<any> {
    const {message} = error.error.error
    console.log('[ERROR_RESPONSE]', message)
    switch (message) {
      case 'EMAIL_NOT_FOUND':
        this.error$.next('Email не найден')
        break
      case 'INVALID_PASSWORD':
        this.error$.next('Не правильный пароль')
        break
      case 'INVALID_EMAIL':
        this.error$.next('Введите правильный email')
        break
      case 'EMAIL_EXISTS':
        this.error$.next('Такой пользователь уже существует')
        break

    }
    return throwError(() => error)
  }

  isAuthenticated() {
    return !!this.token
  }

  setToken(response: IFbAuthResponse | null) {
    if (response) {
      const expDate = new Date(new Date().getTime() + +response.expiresIn * 1000).toString()
      localStorage.setItem('fb-token', response.idToken)
      localStorage.setItem('fb-expDate', expDate)
      localStorage.setItem('fb-localId', response.localId)
    } else {
      localStorage.clear()
    }
  }

  logout() {
    this.setToken(null)
  }

}
