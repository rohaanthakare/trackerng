import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  isAuthorized: boolean = false;
  constructor(private http: HttpClient) { }

  isUserAuthenticated() {
    return this.isAuthorized;
  }

  authenticateUser(username: string, password: string) {
      const formData = new FormData();
      formData.append('Module', 'User');
      formData.append('action', 'authenticateUser');
      return this.http.post(environment.baseUrl, formData);
  }
}
