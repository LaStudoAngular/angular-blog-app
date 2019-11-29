import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Observable, Subject, throwError } from 'rxjs';
import { environment } from '../../../environments/environment';
import { catchError, tap } from 'rxjs/operators';
import { FirebaseAuthResponse, User } from '../interfaces';

const URL = `https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=${environment.apiKey}`;

@Injectable()
export class AuthService {
  public $error: Subject<string> = new Subject<string>();

  constructor(private http: HttpClient) {}

  get getToken(): string {
    const date = new Date();
    const expTokenDate = new Date(window.localStorage.getItem('exp-token'));
    if (date > expTokenDate) {
      this.logout();
      return null;
    }
    return window.localStorage.getItem('token');
  }

  private setToken(response: FirebaseAuthResponse | null) {
    if (response) {
      const expDate = new Date(new Date().getTime() + Number(response.expiresIn) * 1000);
      window.localStorage.setItem('token', String(response.idToken));
      window.localStorage.setItem('exp-token', String(expDate));
    } else {
      window.localStorage.clear();
    }
  }

  login(user: User): Observable<User> {
    user.returnSecureToken = true;
    return this.http
      .post(URL, user)
      .pipe(tap(this.setToken), catchError(this.handleError.bind(this)));
  }

  logout(): void {
    this.setToken(null);
  }

  isAuthenticated(): boolean {
    return Boolean(this.getToken);
  }

  private handleError(error: HttpErrorResponse) {
    const { message } = error.error.error;
    switch (message) {
      case 'EMAIL_NOT_FOUND':
        this.$error.next('EMAIL NOT FOUND');
        break;
      case 'INVALID_PASSWORD':
        this.$error.next('INVALID PASSWORD');
        break;
      case 'INVALID_EMAIL':
        this.$error.next('INVALID EMAIL');
        break;
    }
    return throwError(error);
  }
}
