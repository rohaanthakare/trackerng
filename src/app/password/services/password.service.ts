import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { FormUtils } from 'src/app/utils/form-utils';

@Injectable({
  providedIn: 'root'
})
export class PasswordService {
  module = 'Password';
  constructor(private http: HttpClient) { }

  createPassword(password) {
    return this.http.post(`${environment.baseUrl}/api/create_password`, password);
  }

  public getAllPasswords(filterParams, startIndex, pageSize) {
    return this.http.get(`${environment.baseUrl}/api/get_passwords`, {
      params: {
        start: startIndex,
        limit: pageSize
      }
    });
  }

  showPassword(passwordId) {
    return this.http.get(environment.baseUrl, {
      params: {
        Module: this.module,
        action: 'showPassword',
        id: passwordId
      }
    });
  }

  getPasswordDetail(passwordId) {
    return this.http.get(`${environment.baseUrl}/api/get_password/${passwordId}`);
  }

  updatePassword(id, password) {
    let formData = new FormData();
    formData.append('Module', this.module);
    formData.append('action', 'updatePassword');
    formData.append('id', id);
    formData = FormUtils.getFormParams(password, formData);

    return this.http.post(environment.baseUrl, formData);
  }

  deletePassword() {

  }
}
