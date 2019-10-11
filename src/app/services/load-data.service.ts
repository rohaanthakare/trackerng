import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { DataLoadModule } from '../models/data-load-module.model';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class LoadDataService {

  constructor(private http: HttpClient) { }

  getLoadDataConfig() {
    const headersTmp = new HttpHeaders();
    const headers1 = headersTmp.set('Content-Type', 'text/xml');
    return this.http.get('assets/Data/LoadDataRef.xml', {
      headers: headers1,
      responseType: 'text'
    });
  }

  getModuleData(moduleData: DataLoadModule) {
    const fileUrl = moduleData.dataFilePath + moduleData.dataFileName;
    return this.http.get(fileUrl, {
      responseType: 'text'
    }).pipe(map(data => {
      return {
        content: data,
        moduleDetail: moduleData
      };
    }));
  }
}
