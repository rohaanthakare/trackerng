import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { FormUtils } from '../utils/form-utils';
import { environment } from 'src/environments/environment';
import { DataLoadModule } from '../models/data-load-module.model';
import { Role, RolePermissions } from '../models/role.model';
import { from } from 'rxjs';
import { concatMap } from 'rxjs/operators';

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

  createRolePermissions(rolePerm) {
    let formData = new FormData();
    formData.append('Module', this.module);
    formData.append('action', 'createRolePermissions');
    formData = FormUtils.getFormParams(rolePerm, formData);
    return this.http.post(environment.baseUrl, formData);
  }

  uploadRoles(rows, moduleDetails: DataLoadModule, dataLoaderCmp) {
    return from(rows).pipe(
      concatMap(currentRow => {
        const roleObj = new Role();
        roleObj.roleCode = currentRow[0];
        roleObj.roleName = currentRow[1];
        roleObj.roleDesc = currentRow[2];
        return this.createRole(roleObj);
      })
    );
  }

  uploadRolePermissions(rows, moduleDetails: DataLoadModule, dataLoaderCmp) {
    return from(rows).pipe(
      concatMap(currentRow => {
        const roleObj = new RolePermissions();
        roleObj.roleCode = currentRow[0];
        roleObj.viewCode = currentRow[1];
        return this.createRolePermissions(roleObj);
      })
    );
  }
}
