import { Component, OnInit, ViewChild } from '@angular/core';
import { FinanceService } from '../finance.service';
import { ActivatedRoute } from '@angular/router';
import { ModelListComponent } from 'src/app/core/model-list/model-list.component';
import { DatePipe } from '@angular/common';

@Component({
  selector: 'app-contact-transactions',
  templateUrl: './contact-transactions.component.html',
  styleUrls: ['./contact-transactions.component.scss']
})
export class ContactTransactionsComponent implements OnInit {
  transactions = [];
  contactId: any;
  @ViewChild(ModelListComponent, {static: true}) listGrid: ModelListComponent;
  displayedColumns: string[] = ['transactionDetail', 'transactionDate', 'transactionAmount', 'contactShare'];
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
  }, {
    name: 'contactShare',
    header: 'Amount To Pay',
    field: 'contactShare',
    renderer: (row) => {
      if (row.contactTransactions.length > 0) {
        const trans = row.contactTransactions.find((c) => c.other_contact._id === this.contactId);
        const transactionAmount = trans.transactionAmount.toFixed(2);
        if ((row.accountTransactions.length > 0 && row.accountTransactions[0].transactionType.configCode === 'CREDIT')
          || (row.transactionCategory.configCode === 'DEPOSIT')) {
          return `<label class='success-text'><i class='fas fa-rupee-sign mr-1'></i>${transactionAmount}</label>`;
        } else {
          return `<label class='error-text'><i class='fas fa-rupee-sign mr-1'></i>${transactionAmount}</label>`;
        }
      }
    }
  }];
  constructor(private financeService: FinanceService, private route: ActivatedRoute, private datePipe: DatePipe) { }

  ngOnInit() {
    this.route.paramMap.subscribe(params => {
      this.contactId = params.get('contact_id');
      if (this.contactId) {
        this.financeService.getContactTransactions(this.contactId).subscribe(
          (response: any) => {
            this.listGrid.setTableData(response.data);
          }
        );
      }
    });
  }

}
