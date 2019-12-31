import { Component, OnInit } from '@angular/core';
import { HelperService } from 'src/app/shared/services/helper.service';

@Component({
  selector: 'app-contact-list',
  templateUrl: './contact-list.component.html',
  styleUrls: ['./contact-list.component.scss']
})
export class ContactListComponent implements OnInit {
  viewCode = 'CONTACT_LIST';
  viewTitle = 'Contacts';
  idColumn = '_id';
  displayedColumns: string[] = ['name', 'email', 'mobileNo'];
  columnDefs = [{
    name: 'name',
    header: 'Name',
    field: 'NAME',
    renderer: (row) => {
      const firstName = this.helperService.convertToTitleCase(row.firstName);
      const lastName = this.helperService.convertToTitleCase(row.lastName);
      return firstName + ' ' + lastName;
    }
  }, {
    name: 'email',
    header: 'Email',
    field: 'email'
  }, {
    name: 'mobileNo',
    header: 'Contact No.',
    field: 'mobileNo'
  }];
  constructor(private helperService: HelperService) { }

  ngOnInit() {
  }

}
