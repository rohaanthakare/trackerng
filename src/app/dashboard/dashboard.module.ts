import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AdminDashboardComponent } from './admin-dashboard/admin-dashboard.component';
import { TrackerUserDashboardComponent } from './tracker-user-dashboard/tracker-user-dashboard.component';
import { DashboardComponent } from './dashboard.component';
import { Routes, RouterModule } from '@angular/router';

import { MatCardModule } from '@angular/material/card';
import { NgxChartsModule } from '@swimlane/ngx-charts';
import { MatProgressBarModule } from '@angular/material/progress-bar';

const routes: Routes = [{
  path: '',
  component: DashboardComponent
}, {
  path: 'admin-dashboard',
  component: AdminDashboardComponent
}, {
  path: 'tracker-dashboard',
  component: TrackerUserDashboardComponent
}];

@NgModule({
  declarations: [AdminDashboardComponent, TrackerUserDashboardComponent, DashboardComponent],
  imports: [
    CommonModule, RouterModule.forChild(routes), MatCardModule, NgxChartsModule, MatProgressBarModule
  ]
})
export class DashboardModule { }
