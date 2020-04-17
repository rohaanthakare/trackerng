import { Component, OnInit, ViewChild } from '@angular/core';
import { FinanceService } from '../finance.service';
import { DatePipe } from '@angular/common';
import { MessageService } from 'src/app/shared/services/message.service';
import { ModelListComponent } from 'src/app/core/model-list/model-list.component';

@Component({
  selector: 'app-transaction-list',
  templateUrl: './transaction-list.component.html',
  styleUrls: ['./transaction-list.component.scss']
})
export class TransactionListComponent implements OnInit {
  @ViewChild(ModelListComponent, {static: true}) modelList: ModelListComponent;
  constructor(private financeService: FinanceService, private datePipe: DatePipe, private msgService: MessageService) { }
  displayedColumns: string[] = ['transactionDetail', 'fromAccount', 'toAccount', 'transactionDate', 'transactionAmount'];
  columnDefs = [{
    name: 'transactionDetail',
    header: 'Detail',
    field: 'transactionDetail',
    renderer: (row) => {
      return row.transactionCategory.configName + ' - ' + row.transactionSubCategory.configName + ' - ' + row.transactionDetail;
    }
  }, {
    name: 'fromAccount',
    header: 'From Account',
    field: 'account',
    renderer: (row) => {
      return (row.accountTransactions.length > 0 && row.accountTransactions[0])
        ? row.accountTransactions[0].account.accountName : '';
    }
  }, {
    name: 'toAccount',
    header: 'To Account',
    field: 'account',
    renderer: (row) => {
      return (row.accountTransactions.length > 1 && row.accountTransactions[1])
        ? row.accountTransactions[1].account.accountName : '';
    }
  }, {
    name: 'transactionDate',
    header: 'Date',
    field: 'transactionDate',
    renderer: (row) => {
      return (row.transactionDate) ? this.datePipe.transform(new Date(row.transactionDate), 'dd-MMM-yyyy') : '';
    }
  }, {
    name: 'transactionAmount',
    header: 'Amount',
    field: 'transactionAmount',
    renderer: (row) => {
      const transactionAmount = row.transactionAmount.toFixed(2);
      if ((row.accountTransactions.length > 0 && row.accountTransactions[0].transactionType.configCode === 'CREDIT')
        || (row.transactionCategory.configCode === 'DEPOSIT')) {
        return `<label class='success-text'><i class='fas fa-rupee-sign mr-1'></i>${transactionAmount}</label>`;
      } else {
        return `<label class='error-text'><i class='fas fa-rupee-sign mr-1'></i>${transactionAmount}</label>`;
      }
    }
  }];

  ngOnInit() {
  }

  customEventHandler(event) {
    this.financeService.revertTransaction(event.selectedId).subscribe(
      response => {
        this.msgService.showSuccessMessage('Transation reverted successfully', 'center', 'top');
        this.modelList.loadTableData();
      }
    );
  }

  onRowSelected(event) {
    if (event.selectedRow.transactionCategory.configCode === 'REVERT' || event.selectedRow.isReverted) {
      event.toolbarButtons[0].isDisabled = true;
    } else {
      event.toolbarButtons[0].isDisabled = false;
    }
  }

}
