import { Component, OnInit } from '@angular/core';
import { MasterViewService } from '../services/master-view.service';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.scss']
})
export class MenuComponent implements OnInit {
  menuItems: any;
  // menuItems = [{
  //   title: 'Dashboard',
  //   isLeaf: true,
  //   routerLink: 'home'
  // }, {
  //   title: 'Money Tracker',
  //   routerLink: 'home',
  //   items: [{
  //     title: 'Accounts',
  //     isLeaf: true
  //   }, {
  //     title: 'Deposit',
  //     isLeaf: true
  //   }, {
  //     title: 'Withdraw',
  //     isLeaf: true
  //   }]
  // }];
  constructor(private masterViewService: MasterViewService) { }

  ngOnInit() {
    this.masterViewService.getNavigationMenu().subscribe(
      data => {
        this.menuItems = data.data;
      },
      error => {
        console.log(error);
      }
    );
  }

}
