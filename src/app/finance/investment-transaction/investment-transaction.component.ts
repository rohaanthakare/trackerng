import { DatePipe } from '@angular/common';
import { Component, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ModelListComponent } from 'src/app/core/model-list/model-list.component';
import { FinanceService } from '../finance.service';

@Component({
  selector: 'app-investment-transaction',
  templateUrl: './investment-transaction.component.html',
  styleUrls: ['./investment-transaction.component.scss']
})
export class InvestmentTransactionComponent implements OnInit {
  @ViewChild(ModelListComponent, {static: true}) investmentTransGrid: ModelListComponent;
  investmentId: string;
  investmentTrans = [];

  displayedColumns: string[] = ['description', 'transactionType', 'transactionDate', 'transactionAmount'];

  columnDefs = [{
    name: 'description',
    header: 'Description',
    field: 'description'
  }, {
    name: 'transactionType',
    header: 'Type',
    field: 'transactionType',
    renderer: (row) => {
      return row.transactionType.configName;
    }
  }, {
    name: 'transactionDate',
    header: 'Transaction Date',
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
      return `<i class='fas fa-rupee-sign mr-1'></i>${transactionAmount}`;
    }
  }];

  constructor(private route: ActivatedRoute, private financeService: FinanceService, private datePipe: DatePipe) { }

  ngOnInit() {
    this.route.paramMap.subscribe(
      params => {
        this.investmentId = params.get('id');
        if (this.investmentId) {
          this.financeService.getInvestmentTransaction(this.investmentId).subscribe(
            (response: any) => {
              this.investmentTransGrid.setTableData(response.investmentTrans);
            }
          );      
        }
      }
    );
    
  }

}
