import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { HomeComponent } from './home/home.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { ProfileComponent } from './profile/profile.component';


const routes: Routes = [{
  path: '',
  component: LoginComponent
}, {
  path: 'login',
  component: LoginComponent
}, {
  path: 'home',
  component: HomeComponent,
  children:[{
    path: '',
    component: DashboardComponent
  }, {
    path: 'profile',
    component: ProfileComponent
  }]
}];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
