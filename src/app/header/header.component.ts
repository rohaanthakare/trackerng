import { Component, OnInit } from '@angular/core';
import { AuthService } from '../services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {
  displayName: string;
  userId;
  constructor(private authService: AuthService, private router: Router) { }

  ngOnInit() {
    const userObj = JSON.parse(this.authService.getCurrentUser());
    this.userId = userObj.SYS_USER_ID;
    if (userObj.FIRST_NAME && userObj.LAST_NAME) {
      this.displayName = userObj.FIRST_NAME + ' ' + userObj.LAST_NAME;
    } else {
      this.displayName = userObj.USERNAME;
    }
  }

  logout() {
    this.authService.logout();
    this.router.navigate(['login']);
  }

}
