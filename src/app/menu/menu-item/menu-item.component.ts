import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { Router } from '@angular/router';
import { MenuService } from 'src/app/services/menu.service';

@Component({
  selector: 'app-menu-item',
  templateUrl: './menu-item.component.html',
  styleUrls: ['./menu-item.component.scss']
})
export class MenuItemComponent implements OnInit {
  @Input() menuItem: any;
  @Input() depth: number;
  expanded: boolean;
  constructor(private router: Router, private menuService: MenuService) { }

  ngOnInit() {
    if (!this.depth) {
      this.depth = 0;
    }
  }

  onMenuClicked(item) {
    if (item.items && item.items.length) {
      this.expanded = !this.expanded;
    } else {
      this.router.navigate([item.VIEW_ROUTE]);
      this.menuService.closeMenu();
    }
  }

}
