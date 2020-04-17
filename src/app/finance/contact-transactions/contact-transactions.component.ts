import { Component, OnInit, ViewChild } from '@angular/core';
import { FinanceService } from '../finance.service';
import { ActivatedRoute } from '@angular/router';
import { ModelListComponent } from 'src/app/core/model-list/model-list.component';
import { DatePipe } from '@angular/common';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-contact-transactions',
  templateUrl: './contact-transactions.component.html',
  styleUrls: ['./contact-transactions.component.scss']
})
export class ContactTransactionsComponent implements OnInit {
  transactions = [];
  contactId: any;
  currentUser: any;
  @ViewChild(ModelListComponent, {static: true}) listGrid: ModelListComponent;
  displayedColumns: string[] = ['transactionDetail', 'transactionDate', 'contactShare'];
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
  },
  {
    name: 'contactShare',
    header: 'Contact Share',
    field: 'contactShare',
    renderer: (row) => {
      if (row.contactTransactions.length > 0) {
        const trans = row.contactTransactions.find((c) => {
          if ((c.trans_user === this.currentUser._id
            && c.other_contact._id === this.contactId) ||
            (c.other_user === this.currentUser._id
              && c.trans_contact._id === this.contactId)) {
            return true;
          } else {
            return false;
          }
        });
        const transactionAmount = trans.transactionAmount.toFixed(2);
        const totalAmount = row.transactionAmount.toFixed(2);
        if ((row.transactionCategory.configCode === 'DEPOSIT' && trans.trans_contact._id === this.contactId)
          || (row.transactionCategory.configCode === 'EXPENSE' && trans.other_contact._id === this.contactId)
          || (row.transactionCategory.configCode === 'TRANSFER' && trans.other_contact._id === this.contactId)) {
          return `<label class='success-text mr-1'><i class='fas fa-rupee-sign mr-1'></i>${transactionAmount}</label>
          <label class='success-text small-text'>(Total Amount - <i class='fas fa-rupee-sign mr-1'></i>${totalAmount}</label>)`;
        } else {
          return `<label class='error-text mr-1'><i class='fas fa-rupee-sign mr-1'></i>${transactionAmount}</label>
          <label class='error-text small-text'>(Total Amount - <i class='fas fa-rupee-sign mr-1'></i>${totalAmount}</label>)`;
        }
      }
    }
  }];
  constructor(private financeService: FinanceService, private route: ActivatedRoute, private datePipe: DatePipe,
              private authService: AuthService) { }

  ngOnInit() {
    this.currentUser = this.authService.getCurrentUser();
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
