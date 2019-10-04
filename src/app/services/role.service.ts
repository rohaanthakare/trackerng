import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { FormUtils } from '../utils/form-utils';
import { environment } from 'src/environments/environment';
import { DataLoadModule } from '../models/data-load-module.model';
import { Role } from '../models/role.model';

@Injectable({
  providedIn: 'root'
})
export class RoleService {
  module = 'Role';
  constructor(private http: HttpClient) { }

  createRole(role) {
    let formData = new FormData();
    formData.append('Module', this.module);
    formData.append('action', 'createRole');
    formData = FormUtils.getFormParams(role, formData);
    return this.http.post(environment.baseUrl, formData);
  }

  initModelForDataLoad(rows, moduleDetails: DataLoadModule, dataLoaderCmp) {
    console.log('Inside Role Load Data');
    rows.forEach((currentRow) => {
      const roleObj = new Role();
      roleObj.roleName = currentRow[0];
      roleObj.roleDesc = currentRow[1];
      this.createRole(roleObj).subscribe(
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
