import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  isAuthorized: boolean = false;
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

  authenticateUser(username: string, password: string) {
      const formData = new FormData();
      formData.append('Module', 'User');
      formData.append('action', 'authenticateUser');
      formData.append('username', username);
      return this.http.post(environment.baseUrl, formData).pipe(map(res => {
        console.log(res);
      }));
  }
}
