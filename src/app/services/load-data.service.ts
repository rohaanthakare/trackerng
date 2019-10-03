import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

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

  getModuleData() {
    return this.http.get('assets/Data/BaseData/Users.csv', {
      responseType: 'text'
    });
  }
}
