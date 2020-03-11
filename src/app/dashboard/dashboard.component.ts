import { Component, OnInit, ViewEncapsulation, ViewChild } from '@angular/core';
import { GlobalConstants } from '../global/global.enum';
import { ModelListComponent } from '../core/model-list/model-list.component';
import { UserService } from '../services/user.service';
import { CurrencyPipe } from '@angular/common';
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

  constructor(private userService: UserService, private cp: CurrencyPipe) {
  }

  ngOnInit() {
    this.userService.getDashboardData().subscribe(
      (response: any) => {
        this.prepareChartData(response.accounts, 'accountBalance');
        this.prepareChartData(response.expenseSplit, 'expenseSplit');
        this.prepareChartData(response.expenseHistory, 'expenseHistory');
      }
    );
    // this.tasksGrid.setTableData(this.taskList);
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
      data.forEach((d) => {
        this.expenseSplit.push({
          name: d.expense_tps[0].configName,
          value: d.total
        });
      });
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
