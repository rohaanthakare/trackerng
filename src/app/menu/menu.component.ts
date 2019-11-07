import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { MasterViewService } from '../services/master-view.service';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.scss']
})
export class MenuComponent implements OnInit {
  menuItems: any;
  @Output() toggleNavEvent = new EventEmitter();
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

  navItemClicked() {
    this.toggleNavEvent.emit(null);
  }
}
