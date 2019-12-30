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
    return this.http.get(`${environment.baseUrl}/api/get_user_contacts`, {
      params: {
        start: startIndex,
        limit: pageSize
      }
    });
  }

  createUserContact(contactDetails) {
    return this.http.post(`${environment.baseUrl}/api/create_contact`, contactDetails);
  }
}
