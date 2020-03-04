import { Component, OnInit } from '@angular/core';
import { CurrencyPipe } from '@angular/common';

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
    field: 'accountName',
    footer: 'Total'
  }, {
    name: 'balance',
    header: 'Balance',
    field: 'balance',
    renderer: (row) => {
      // const balance = row.balance.toFixed(2);
      const balance = this.cp.transform(row.balance, 'INR');
      return `${balance}`;
    },
    footerRenderer: (data) => {
      data = data.toFixed(2);
      return `<i class='fas fa-rupee-sign mr-1'></i>${data}`;
    },
    footer: 'SUM'
  }];
  constructor(private cp: CurrencyPipe) { }

  ngOnInit() {
  }

}
