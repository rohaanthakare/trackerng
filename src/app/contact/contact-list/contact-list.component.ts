import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-contact-list',
  templateUrl: './contact-list.component.html',
  styleUrls: ['./contact-list.component.scss']
})
export class ContactListComponent implements OnInit {
  viewCode = 'CONTACT_LIST';
  viewTitle = 'Contacts';
  displayedColumns: string[] = ['name', 'email', 'contact_no'];
  columnDefs = [{
    name: 'name',
    header: 'Name',
    field: 'NAME'
  }, {
    name: 'email',
    header: 'Email',
    field: 'EMAIL'
  }, {
    name: 'contact_no',
    header: 'Contact No.',
    field: 'CONTACT_NO'
  }];
  constructor() { }

  ngOnInit() {
  }

}
