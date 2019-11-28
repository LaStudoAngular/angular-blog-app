import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { User } from '../interfaces/user';
import { Observable } from 'rxjs';
import { environment } from '../../../environments/environment';
import { tap } from 'rxjs/operators';
import { FirebaseAuthResponse } from '../interfaces/firebase-auth-response';

const URL = `https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=${environment.apiKey}`;

@Injectable()
export class AuthService {
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

  login(user: User): Observable<any> {
    user.returnSecureToken = true;
    return this.http.post(URL, user).pipe(tap(this.setToken));
  }

  logout(): void {
    this.setToken(null);
  }

  isAuthenticated(): boolean {
    return Boolean(this.getToken);
  }
}
