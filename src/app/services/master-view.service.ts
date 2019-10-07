import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { FormUtils } from '../utils/form-utils';
import { DataLoadModule } from '../models/data-load-module.model';
import { MasterView } from '../models/master-view.model';

@Injectable({
  providedIn: 'root'
})
export class MasterViewService {
  module = 'MasterView';
  constructor(private http: HttpClient) { }

  createMasterView(masterview) {
    let formData = new FormData();
    formData.append('Module', this.module);
    formData.append('action', 'createMasterViewConfig');
    formData = FormUtils.getFormParams(masterview, formData);
    return this.http.post(environment.baseUrl, formData);
  }

  initModelForDataLoad(rows, moduleDetails: DataLoadModule, dataLoaderCmp) {
    rows.forEach((currentRow) => {
        const masterViewObj = new MasterView();
        masterViewObj.viewCode = currentRow[0];
        masterViewObj.viewTitle = currentRow[1];
        masterViewObj.viewName = currentRow[2];
        masterViewObj.icon = currentRow[3];
        masterViewObj.route = currentRow[4];
        masterViewObj.viewType = currentRow[5];
        masterViewObj.parentView = currentRow[6];
        masterViewObj.displayOrder = currentRow[7];
        this.createMasterView(masterViewObj).subscribe(
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
