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
    let formData = new FormData();
    formData.append('Module', this.module);
    formData.append('action', 'createPassword');
    formData = FormUtils.getFormParams(password, formData);

    return this.http.post(environment.baseUrl, formData);
  }

  public getAllPasswords() {
    return this.http.get(environment.baseUrl, {
      params: {
        Module: this.module,
        action: 'getAllPasswords'
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
    return this.http.get(environment.baseUrl, {
      params: {
        Module: this.module,
        action: 'getPasswordDetail',
        id: passwordId
      }
    });
  }

  deletePassword() {

  }
}
