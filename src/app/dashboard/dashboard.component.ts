import { Component, OnInit, ViewEncapsulation, ViewChild, ElementRef } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../services/auth.service';
import { Role } from '../models/role.model';
@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class DashboardComponent implements OnInit {
  constructor(private router: Router, private authService: AuthService) {}
  dashboardRoutes = {
    ADMIN: 'admin-dashboard',
    TRACKER_USER: 'tracker-dashboard'
  };
  ngOnInit() {
    this.router.navigate([`home/${this.dashboardRoutes[this.authService.getCurrentUser().role]}`]);
  }
}
