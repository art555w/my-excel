import {Injectable} from '@angular/core';
import {catchError, Observable, Subject, tap, throwError} from "rxjs";
import {HttpClient, HttpErrorResponse} from "@angular/common/http";
import {environment} from "../../../environments/environment";
import {IFbResponse, IUser} from "../../shared/interface";

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
    return this.http.post<IFbResponse>(`https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=${environment.apiKey}`, user)
      .pipe(
        tap(this.setToken),
        catchError(this.handleError.bind(this))
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
    }
    return throwError(() => error)
  }

  isAuthenticated() {
    return !!this.token
  }

  setToken(response: IFbResponse | null) {
    if (response) {
      const expDate = new Date(new Date().getTime() + +response.expiresIn * 1000).toString()
      localStorage.setItem('fb-token', response.idToken)
      localStorage.setItem('fb-expDate', expDate)
    } else {
      localStorage.clear()
    }
  }

  logout() {
    this.setToken(null)
  }

}
