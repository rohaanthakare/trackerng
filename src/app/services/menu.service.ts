import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class MenuService {
  sidenav: any;
  constructor(private http: HttpClient) { }

  getCurrentUserMenus() {
    const reqParams = new HttpParams();
    reqParams.append('Module', 'User');
    reqParams.append('action', 'getCurrentUserMenus');
    return this.http.get(environment.baseUrl, {
      params: reqParams
    });
  }

  public closeMenu() {
    this.sidenav.close();
  }
}
