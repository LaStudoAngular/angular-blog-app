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
    return '';
  }

  private setToken(response: FirebaseAuthResponse) {
    console.log(response.idToken);
  }

  login(user: User): Observable<any> {
    return this.http.post(URL, user).pipe(tap(this.setToken));
  }

  logout() {}

  isAuthenticated(): boolean {
    return Boolean(this.getToken);
  }
}
