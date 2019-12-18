import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { HomeComponent } from './home/home.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { ProfileComponent } from './profile/profile.component';
import { RegisterComponent } from './register/register.component';
import { ForgotPasswordComponent } from './forgot-password/forgot-password.component';
import { DataLoaderComponent } from './data-loader/data-loader.component';
import { OuterComponent } from './outer/outer.component';
import { UserActivationComponent } from './user-activation/user-activation.component';


const routes: Routes = [{
  path: '',
  component: OuterComponent
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
  path: 'activate-user/:id',
  component: UserActivationComponent
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
    path: 'password',
    loadChildren: './password/password.module#PasswordModule'
  }, {
    path: 'contact',
    loadChildren: './contact/contact.module#ContactModule'
  }]
}];

@NgModule({
  imports: [RouterModule.forRoot(routes, {
    useHash: true
  })],
  exports: [RouterModule]
})
export class AppRoutingModule { }
