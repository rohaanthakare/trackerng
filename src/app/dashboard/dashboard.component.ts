import { Component, OnInit, ViewEncapsulation, ViewChild } from '@angular/core';
import { GlobalConstants } from '../global/global.enum';
import { ModelListComponent } from '../core/model-list/model-list.component';
@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class DashboardComponent implements OnInit {
  // @ViewChild(ModelListComponent, {static: true}) tasksGrid: ModelListComponent;
  colors = GlobalConstants.COLORS;
  gradient = false;
  view: any[];
  view1: any[];
  showLegend = true;
  showXAxis = true;
  showYAxis = true;
  legendPosition = 'below';
  isDoughnut = true;
  accounts = [{
    name: 'ICICI- Savings',
    value: 3130
  }, {
    name: 'SBI - Savings',
    value: 3029
  }, {
    name: 'UBI - Saving',
    value: 324
  }, {
    name: 'HDFC - Saving',
    value: 954
  }, {
    name: 'PayTM Wallet',
    value: 740
  }, {
    name: 'Wallet',
    value: 0
  }
];

  expenseHistory = [
    {
      name: 'Jan-2020',
      value: 8940000
    },
    {
      name: 'Feb-2020',
      value: 5000000
    },
    {
      name: 'Mar-2020',
      value: 7200000
    },
    {
      name: 'Apr-2020',
      value: 620000
    }
  ];

  expenseSplit = [
    {
      name: 'Germany',
      value: 8940000
    },
    {
      name: 'USA',
      value: 5000000
    },
    {
      name: 'France',
      value: 7200000
    },
      {
      name: 'UK',
      value: 6200000
    }
  ];

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

  budgetStatus = [{
    category: 'Grocery',
    allocated: 3000,
    spent: 500
  }, {
    category: 'Transportation',
    allocated: 5000,
    spent: 2500
  }, {
    category: 'Housing',
    allocated: 12000,
    spent: 2600
  }];

  constructor() {
  }

  ngOnInit() {
    // this.tasksGrid.setTableData(this.taskList);
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
