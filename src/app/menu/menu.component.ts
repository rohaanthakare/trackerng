import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { MasterViewService } from '../services/master-view.service';
import { AuthService } from '../services/auth.service';
import { Roles } from '../models/role.model';
import { GlobalConstants } from '../global/global.enum';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.scss']
})
export class MenuComponent implements OnInit {
  menuItems: any;
  @Output() toggleNavEvent = new EventEmitter();
  constructor(private masterViewService: MasterViewService, private authService: AuthService) { }

  ngOnInit() {
    if (this.authService.getCurrentUser().role === Roles.ADMIN) {
      this.menuItems = GlobalConstants.ADMIN_VIEWS;
    } else {
      this.masterViewService.getNavigationMenu().subscribe(
        data => {
          this.menuItems = data.menus;
        },
        error => {
          console.log(error);
        }
      );
    }
  }

  navItemClicked() {
    this.toggleNavEvent.emit(null);
  }
}
