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
    field: 'balance',
    renderer: (row) => {
      const balance = row.balance.toFixed(2);
      return `<i class='fas fa-rupee-sign mr-1'></i>${balance}`;
    }
  }];
  constructor() { }

  ngOnInit() {
  }

}
