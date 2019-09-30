import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { map } from 'rxjs/operators';
import { FormUtils } from '../utils/form-utils';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  isAuthorized = false;
  constructor(private http: HttpClient) { }

  isUserAuthenticated() {
    return this.isAuthorized;
  }

  setUserToken(token: any) {
    localStorage.setItem('Token', token);
  }

  setUserDetails(userDetails: any) {
    localStorage.setItem('currentUser', userDetails);
  }

  authenticateUser(userInfo) {
      let formData = new FormData();
      formData.append('Module', 'User');
      formData.append('action', 'authenticateUser');
      formData = FormUtils.getFormParams(userInfo, formData);
      return this.http.post(environment.baseUrl, formData).pipe(map(res => {
        console.log(res);
      }));
  }
}
