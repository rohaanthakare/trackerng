import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { User } from '../models/user.model';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private http: HttpClient) { }

  authenticateUser(username: string, password: string) {
    const userObj = new User();
    userObj.username = username;
    userObj.password = password;
    return this.http.post(environment.baseUrl, {
      Module: 'User',
      action: 'authenticateUser',
      user: userObj
    });
  }
}
