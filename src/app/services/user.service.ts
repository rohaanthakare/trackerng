import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { User, UserRoles } from '../models/user.model';
import { FormUtils } from '../utils/form-utils';
import { DataLoadModule } from '../models/data-load-module.model';

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
    return this.http.post<any>(environment.baseUrl, formData);
  }

  attachRoleToUser(userRoleObj: any) {
    let formData = new FormData();
    formData.append('Module', this.module);
    formData.append('action', 'attachRoleToUser');
    formData = FormUtils.getFormParams(userRoleObj, formData);
    return this.http.post<any>(environment.baseUrl, formData);
  }

  uploadUsers(rows, moduleDetails: DataLoadModule, dataLoaderCmp) {
    rows.forEach((currentRow) => {
        const userObj = new User();
        userObj.username = currentRow[0];
        userObj.password = currentRow[1];
        userObj.emailId = currentRow[2];
        userObj.contactNo = currentRow[3];
        this.registerUser(userObj).subscribe(
          data => {
            dataLoaderCmp.updateProgress(moduleDetails, true);
          },
          error => {
            dataLoaderCmp.updateProgress(moduleDetails, false);
          }
        );
    });
  }

  uploadUserRoles(rows, moduleDetails: DataLoadModule, dataLoaderCmp) {
    rows.forEach((currentRow) => {
        const userRoleObj = new UserRoles();
        userRoleObj.username = currentRow[0];
        userRoleObj.roleCode = currentRow[1];
        this.attachRoleToUser(userRoleObj).subscribe(
          data => {
            dataLoaderCmp.updateProgress(moduleDetails, true);
          },
          error => {
            dataLoaderCmp.updateProgress(moduleDetails, false);
          }
        );
    });
  }
}
