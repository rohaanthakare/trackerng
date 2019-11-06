import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { FormUtils } from '../utils/form-utils';
import { environment } from 'src/environments/environment';
import { DataLoadModule } from '../models/data-load-module.model';
import { MasterData } from '../models/master-data.model';
import { Observable, from } from 'rxjs';
import { concatMap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class MasterDataService {
  module = 'MasterData';
  constructor(private http: HttpClient) { }

  createMasterData(masterDataObj) {
    let formData = new FormData();
    formData.append('Module', this.module);
    formData.append('action', 'createMasterData');
    formData = FormUtils.getFormParams(masterDataObj, formData);
    return this.http.post(environment.baseUrl, formData);
  }

  uploadMasterData(rows, moduleDetails: DataLoadModule, dataLoaderCmp) {
    console.log('Master Data Upload started');
    return from(rows).pipe(
      concatMap(currentRow => {
        const masterDataObj = new MasterData();
        masterDataObj.configCode = currentRow[0];
        masterDataObj.configName = currentRow[1];
        masterDataObj.configDesc = currentRow[2];
        masterDataObj.displayOrder = currentRow[3];
        masterDataObj.parentConfig = currentRow[4];
        return this.createMasterData(masterDataObj);
      })
    );
    // .subscribe(
    //   data => {
    //     console.log('Master Data Uploaded');
    //     dataLoaderCmp.updateProgress(moduleDetails, true);
    //   },
    //   error => {
    //     dataLoaderCmp.updateProgress(moduleDetails, false);
    //   }
    // );
  }
}
