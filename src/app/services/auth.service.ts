import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { map } from 'rxjs/operators';
import { FormUtils } from '../utils/form-utils';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  isAuthorized = false;
  constructor(private http: HttpClient, private router: Router) { }

  isUserAuthenticated() {
    return this.isAuthorized;
  }

  setUserToken(token: any) {
    localStorage.setItem('Token', token);
  }

  getUserToken() {
    return localStorage.getItem('Token');
  }

  setUserDetails(userDetails: any) {
    localStorage.setItem('currentUser', JSON.stringify(userDetails));
  }

  getCurrentUser() {
    return JSON.parse(localStorage.getItem('currentUser'));
  }

  authenticateUser(userInfo) {
    return this.http.post(`${environment.baseUrl}/api/authenticate_user`, userInfo).pipe(map((res: any) => {
      if (res.user) {
        this.setUserDetails(res.user);
        this.setUserToken(res.user_token);
      }
      return res;
    }));
  }

  logout() {
    localStorage.removeItem('currentUser');
    localStorage.removeItem('Token');
    this.router.navigate(['/']);
  }
}
