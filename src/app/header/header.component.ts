import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { AuthService } from '../services/auth.service';
import { Router } from '@angular/router';
import { HelperService } from '../shared/services/helper.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {
  @Output() toggleNavEvent = new EventEmitter();
  displayName: string;
  userId;
  constructor(private authService: AuthService, private router: Router, private helperService: HelperService) { }

  ngOnInit() {
    const userObj = JSON.parse(this.authService.getCurrentUser());
    if (userObj.firstName) {
      this.displayName = this.helperService.convertToTitleCase(userObj.firstName) + ' '
        + this.helperService.convertToTitleCase(userObj.lastName);
    } else {
      this.displayName = this.helperService.convertToTitleCase(userObj.username);
    }
  }

  logout() {
    this.authService.logout();
    this.router.navigate(['login']);
  }

  myProfile() {
    this.router.navigate(['home/profile']);
  }

  toggleSideNav() {
    this.toggleNavEvent.emit(null);
  }
}
