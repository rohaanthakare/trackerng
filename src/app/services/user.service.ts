import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { User } from '../models/user.model';
import { FormUtils } from '../utils/form-utils';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  module = 'User';
  constructor(private http: HttpClient) { }

  registerUser(userInfo: any) {
    let formData = new FormData();
    formData.append('Module', this.module);
    formData.append('action', 'registerUser');
    formData = FormUtils.getFormParams(userInfo, formData);
    return this.http.post(environment.baseUrl, formData);
  }
}
