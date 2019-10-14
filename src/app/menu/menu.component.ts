import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.scss']
})
export class MenuComponent implements OnInit {
  menuItems = [{
    title: 'Dashboard'
  }, {
    title: 'Money Tracker',
    items: [{
      title: 'Accounts'
    }, {
      title: 'Deposit'
    }, {
      title: 'Withdraw'
    }]
  }];
  constructor() { }

  ngOnInit() {
  }

}
