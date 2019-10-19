import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { HomeComponent } from './home/home.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { ProfileComponent } from './profile/profile.component';
import { RegisterComponent } from './register/register.component';
import { ForgotPasswordComponent } from './forgot-password/forgot-password.component';
import { DataLoaderComponent } from './data-loader/data-loader.component';


const routes: Routes = [{
  path: '',
  component: LoginComponent
}, {
  path: 'login',
  component: LoginComponent
}, {
  path: 'register',
  component: RegisterComponent
}, {
  path: 'forgot-pass',
  component: ForgotPasswordComponent
}, {
  path: 'load-data',
  component: DataLoaderComponent
}, {
  path: 'home',
  component: HomeComponent,
  children: [{
    path: '',
    component: DashboardComponent
  }, {
    path: 'dashboard',
    component: DashboardComponent
  }, {
    path: 'profile',
    component: ProfileComponent
  }, {
    path: 'passwords',
    loadChildren: './password/password.module#PasswordModule'
  }]
}];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
