import { Component, OnInit } from '@angular/core';
import { FinanceService } from '../finance.service';
import { DatePipe } from '@angular/common';

@Component({
  selector: 'app-transaction-list',
  templateUrl: './transaction-list.component.html',
  styleUrls: ['./transaction-list.component.scss']
})
export class TransactionListComponent implements OnInit {

  constructor(private financeService: FinanceService, private datePipe: DatePipe) { }
  displayedColumns: string[] = ['transactionDetail', 'transactionDate', 'transactionAmount'];
  columnDefs = [{
    name: 'transactionDetail',
    header: 'Detail',
    field: 'transactionDetail',
    renderer: (row) => {
      return row.transactionCategory.configName + ' - ' + row.transactionSubCategory.configName + ' - ' + row.transactionDetail;
    }
  }, {
    name: 'transactionDate',
    header: 'Date',
    field: 'transactionDate',
    renderer: (row) => {
      return this.datePipe.transform(new Date(row.transactionDate), 'dd-MMM-yyyy');
    }
  }, {
    name: 'transactionAmount',
    header: 'Amount',
    field: 'transactionAmount',
    renderer: (row) => {
      const transactionAmount = row.transactionAmount.toFixed(2);
      if (row.transactionCategory.configCode === 'DEPOSIT') {
        return `<label class='success-text'><i class='fas fa-rupee-sign mr-1'></i>${transactionAmount}</label>`;
      } else {
        return `<label class='error-text'><i class='fas fa-rupee-sign mr-1'></i>${transactionAmount}</label>`;
      }
    }
  }];

  ngOnInit() {
  }

  customEventHandler(event) {

  }

}
