import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ContactService {
  module = 'Contact';
  constructor(private http: HttpClient) { }

  getUserContacts(filterParams, startIndex, pageSize) {
    return this.http.get(environment.baseUrl, {
      params: {
        Module: this.module,
        action: 'getUserContacts',
        start: startIndex,
        limit: pageSize
      }
    });
  }
}
