import { DatePipe } from '@angular/common';
import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { ModelListComponent } from 'src/app/core/model-list/model-list.component';
import { HelperService } from 'src/app/shared/services/helper.service';
import { FinanceService } from '../finance.service';
import { InvestMoneyComponent } from '../invest-money/invest-money.component';

@Component({
  selector: 'app-investments-list',
  templateUrl: './investments-list.component.html',
  styleUrls: ['./investments-list.component.scss']
})
export class InvestmentsListComponent implements OnInit {
  @ViewChild(ModelListComponent, {static: true}) listGrid: ModelListComponent;
  displayedColumns: string[] = ['name', 'investmentType', 'startedOn', 'maturedOn', 'investmentAmount', 'maturityAmount'];

  columnDefs = [{
    name: 'name',
    header: 'Name',
    field: 'name',
    renderer: (row) => {
      return this.helperService.convertToTitleCase(row.name);
    }
  }, {
    name: 'investmentType',
    header: 'Type',
    field: 'investmentType',
    renderer: (row) => {
      return row.investmentType.configName;
    }
  }, {
    name: 'startedOn',
    header: 'Started On',
    field: 'startedOn',
    renderer: (row) => {
      return (row.startedOn) ? this.datePipe.transform(new Date(row.startedOn), 'dd-MMM-yyyy') : '';
    }
  }, {
    name: 'maturedOn',
    header: 'Matured On',
    field: 'maturedOn',
    renderer: (row) => {
      return (row.maturedOn) ? this.datePipe.transform(new Date(row.maturedOn), 'dd-MMM-yyyy') : '';
    }
  }, {
    name: 'investmentAmount',
    header: 'Investment Amount',
    field: 'investmentAmount',
    renderer: (row) => {
      const investmentAmountConv = row.investmentAmount.toFixed(2);
      return `<i class='fas fa-rupee-sign mr-1'></i>${investmentAmountConv}`;
    }
  }, {
    name: 'maturityAmount',
    header: 'Maturity Amount',
    field: 'maturityAmount',
    renderer: (row) => {
      if (row.maturityAmount) {
        const maturityAmountConv = row.maturityAmount.toFixed(2);
        return `<i class='fas fa-rupee-sign mr-1'></i>${maturityAmountConv}`;
      } else {
        return '';
      }
    }
  }];

  constructor(private financeService: FinanceService, private helperService: HelperService, private datePipe: DatePipe,
    private dialog: MatDialog, private router: Router) { }

  ngOnInit() {
    this.getUserInvestmentsList();
  }

  getUserInvestmentsList() {
    this.financeService.getUserInvestments().subscribe(
      (data: any) => {
        this.listGrid.setTableData(data.investments);
      }
    );
  }

  onRowSelected(event) {
    event.toolbarButtons.forEach((btn) => {
      if (btn.viewCode === 'INVEST_MONEY' || btn.viewCode === 'CLOSE_INVESTMENT' || btn.viewCode === 'INVESTMENT_TRANSACTION') {
        btn.isDisabled = false;
      }
    });
  }

  customEventHandler(event) {
    if (event.action === 'INVEST_MONEY') {
      const dialogRef = this.dialog.open(InvestMoneyComponent, {
        width: '350px',
        panelClass: 'zero-padding-cls',
        data: {
          investmentDetail: event.selectedRecord,
          transactionType: event.action
        }
      });
      dialogRef.afterClosed().subscribe(result => {
        this.getUserInvestmentsList();
      });

    } else if (event.action === 'CLOSE_INVESTMENT') {
      const dialogRef = this.dialog.open(InvestMoneyComponent, {
        width: '350px',
        panelClass: 'zero-padding-cls',
        data: {
          investmentDetail: event.selectedRecord,
          transactionType: event.action
        }
      });

      dialogRef.afterClosed().subscribe(result => {
        this.getUserInvestmentsList();
      });
    } else if (event.action === 'INVESTMENT_TRANSACTION') {
      this.router.navigate([`home/finance/investment_transactions/${event.selectedRecord._id}`]);
    } 
  }
}
