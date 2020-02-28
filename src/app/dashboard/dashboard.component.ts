import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { GlobalConstants } from '../global/global.enum';
@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class DashboardComponent implements OnInit {
  colors = GlobalConstants.COLORS;
  view: any[] = [800, 200];
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
  constructor() { }

  ngOnInit() {
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
