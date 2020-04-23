import { Component, OnInit, ViewEncapsulation, ViewChild } from '@angular/core';
import { GlobalConstants } from '../global/global.enum';
import { ModelListComponent } from '../core/model-list/model-list.component';
import { UserService } from '../services/user.service';
import { CurrencyPipe } from '@angular/common';
import { MasterDataService } from '../services/master-data.service';
@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class DashboardComponent implements OnInit {
  // @ViewChild(ModelListComponent, {static: true}) tasksGrid: ModelListComponent;
  colors = GlobalConstants.COLORS;
  singleColor = GlobalConstants.SINGLE_COLOR;
  gradient = false;
  view: any[];
  view1: any[];
  showLegend = true;
  showXAxis = true;
  showYAxis = true;
  showXAxisLabel = true;
  showYAxisLabel = true;
  xAxisLabel = 'Month';
  yAxisLabel = 'Expense';
  showLabels = true;
  legendPosition = 'below';
  isDoughnut = true;
  accounts = [];
  expenseHistory = [];
  expenseSplit = [];
  totalMonthlyExpense: any;
  moneyToTake: any;
  moneyToGive: any;

  taskList = [{
    _id: 'asjdkjaskjakjskajskdj343j4k5',
    name: 'Credit Card Bill'
  }, {
    _id: 'asjdkjaskjkajskdj343j0094k5',
    name: 'Mobile Bill'
  }, {
    _id: 'asjdkjaskjakjskkdj343j4k5',
    name: 'Eon Service'
  }, {
    _id: 'asjdkjaskjakjskajskdj343898k5',
    name: 'Prperty Tax Payment'
  }];

  displayedColumns: string[] = ['name'];
  columnDefs = [{
    name: 'name',
    header: 'Task',
    field: 'NAME'
  }];

  budgetStatus = [];
  expenseCategory = [];

  constructor(private userService: UserService, private cp: CurrencyPipe, private masterDataService: MasterDataService) {
  }

  ngOnInit() {
    this.moneyToGive = 0;
    this.moneyToTake = 0;
    this.masterDataService.getMasterDataForParent('EXPENSE_CATEGORY').subscribe(
      (response: any) => {
        this.expenseCategory = response.data;
        this.getDashboardData();
      }
    );
    // this.tasksGrid.setTableData(this.taskList);
  }

  getDashboardData() {
    this.userService.getDashboardData().subscribe(
      (response: any) => {
        this.prepareChartData(response.accounts, 'accountBalance');
        this.prepareChartData(response.expenseSplit, 'expenseSplit');
        this.prepareChartData(response.expenseHistory, 'expenseHistory');
        if (response.financeProfile) {
          this.prepareChartData(response.financeProfile.budgetConfig, 'budgetStatus');
        }
        this.moneyToGive = this.cp.transform(response.settlements.MONEY_TO_GIVE, 'INR', '');
        this.moneyToTake = this.cp.transform(response.settlements.MONEY_TO_TAKE, 'INR', '');
      }
    );
  }

  prepareChartData(data, chart) {
    if (chart === 'accountBalance') {
      this.accounts = [];
      data.forEach((d) => {
        this.accounts.push({
          name: d.accountName,
          value: d.balance
        });
      });
    }

    if (chart === 'expenseSplit') {
      this.expenseSplit = [];
      this.totalMonthlyExpense = 0;
      data.forEach((d) => {
        this.totalMonthlyExpense += d.total;
        this.expenseSplit.push({
          name: d.expense_tps[0].configName,
          value: d.total
        });
      });

      this.totalMonthlyExpense = this.cp.transform(this.totalMonthlyExpense, 'INR', '');
    }

    if (chart === 'expenseHistory') {
      this.expenseHistory = [];
      data.forEach((d) => {
        this.expenseHistory.push({
          name: GlobalConstants.MONTHS_MMM[d._id.month - 1] + ' - ' + d._id.year,
          value: d.total
        });
      });
    }

    if (chart === 'budgetStatus') {
      this.budgetStatus = [];
      for (const key in data) {
        if (data[key] > 0) {
          const catg = this.expenseCategory.find((c) => c.configCode === key);
          const spentCfg = this.expenseSplit.find((c) => c.name === catg.configName);
          const spentAmt = (spentCfg) ? spentCfg.value : 0;
          const spentAmtLbl = this.cp.transform(spentAmt, 'INR', '');
          const allocatedLbl = this.cp.transform(data[key], 'INR', '');
          const spentPer = ((data[key] - spentAmt) / data[key]) * 100;
          let progressColor = 'primary';
          if (spentPer < 10) {
            progressColor = 'warn';
          } else if (spentPer > 10 && spentPer < 40) {
            progressColor = 'accent';
          }
          const catgEle = {
            category: catg.configName,
            spentPercentage: spentPer,
            spentAmtString: spentAmtLbl,
            allocatedString: allocatedLbl,
            barColor: progressColor
          };
          this.budgetStatus.push(catgEle);
        }
      }
    }
  }

  onSelect(data): void {
    console.log('Item clicked', JSON.parse(JSON.stringify(data)));
  }

  onActivate(data): void {
    console.log('Activate', JSON.parse(JSON.stringify(data)));
  }

  onDeactivate(data): void {
    console.log('Deactivate', JSON.parse(JSON.stringify(data)));
  }

}
