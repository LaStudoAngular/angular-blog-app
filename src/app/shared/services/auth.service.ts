import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { User } from '../interfaces/user';
import { Observable } from 'rxjs';

const URL = '';

@Injectable()
export class AuthService {
  constructor(private http: HttpClient) {}

  get getToken(): string {
    return '';
  }

  login(user: User): Observable<any> {
    return this.http.post(URL, user);
  }

  logout() {}

  isAuthenticated(): boolean {
    return Boolean(this.getToken);
  }
}
