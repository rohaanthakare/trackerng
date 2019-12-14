import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { Router } from '@angular/router';
import { MenuService } from 'src/app/services/menu.service';
import { MasterViewService } from 'src/app/services/master-view.service';
import { MasterView } from 'src/app/models/master-view.model';

@Component({
  selector: 'app-menu-item',
  templateUrl: './menu-item.component.html',
  styleUrls: ['./menu-item.component.scss']
})
export class MenuItemComponent implements OnInit {
  @Input() menuItem: MasterView;
  @Input() depth: number;
  expanded: boolean;
  isMaterialIcon = true;
  constructor(private router: Router,
              private menuService: MenuService) { }

  ngOnInit() {
    if (this.menuItem.iconClass.includes('fas')) {
      this.isMaterialIcon = false;
    }
    if (!this.depth) {
      this.depth = 0;
    }
  }

  onMenuClicked(item) {
    if (item.items && item.items.length) {
      this.expanded = !this.expanded;
    } else {
      this.router.navigate([item.viewRoute]);
      this.menuService.closeMenu();
    }
  }

}
