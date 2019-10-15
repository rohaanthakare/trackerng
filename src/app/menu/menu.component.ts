import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.scss']
})
export class MenuComponent implements OnInit {
  menuItems = [{
    title: 'Dashboard',
    isLeaf: true,
    routerLink: 'home'
  }, {
    title: 'Money Tracker',
    routerLink: 'home',
    items: [{
      title: 'Accounts',
      isLeaf: true
    }, {
      title: 'Deposit',
      isLeaf: true
    }, {
      title: 'Withdraw',
      isLeaf: true
    }]
  }];
  constructor() { }

  ngOnInit() {
  }

}
