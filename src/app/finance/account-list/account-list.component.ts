import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-account-list',
  templateUrl: './account-list.component.html',
  styleUrls: ['./account-list.component.scss']
})
export class AccountListComponent implements OnInit {
  viewCode = 'BANK_ACCOUNTS';
  displayedColumns: string[] = ['accountName', 'balance'];
  columnDefs = [{
    name: 'accountName',
    header: 'Name',
    field: 'accountName'
  }, {
    name: 'balance',
    header: 'Balance',
    field: 'balance'
  }];
  constructor() { }

  ngOnInit() {
  }

}
