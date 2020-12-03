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
import { ResetPasswordComponent } from './reset-password/reset-password.component';
import { OtpActivationComponent } from './otp-activation/otp-activation.component';
import { AuthGuardService } from './services/auth-guard.service';
import { MailTesterComponent } from './mail-tester/mail-tester.component';


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
  path: 'reset-pass/:id',
  component: ResetPasswordComponent
}, {
  path: 'load-data',
  component: DataLoaderComponent
}, {
  path: 'activate-user/:id',
  component: UserActivationComponent
}, {
  path: 'activate-by-otp/:id',
  component: OtpActivationComponent
}, {
  path: 'home',
  component: HomeComponent,
  canActivate: [AuthGuardService],
  children: [{
    path: '',
    loadChildren: './dashboard/dashboard.module#DashboardModule'
  }, {
    path: 'dashboard',
    loadChildren: './dashboard/dashboard.module#DashboardModule'
  }, {
    path: 'profile',
    component: ProfileComponent
  }, {
    path: 'password',
    loadChildren: './password/password.module#PasswordModule'
  }, {
    path: 'contact',
    loadChildren: './contact/contact.module#ContactModule'
  }, {
    path: 'finance',
    loadChildren: './finance/finance.module#FinanceModule'
  }, {
    path: 'grocery-list',
    loadChildren: './grocery/grocery.module#GroceryModule'
  }, {
    path: 'load-data',
    component: DataLoaderComponent
  }, {
    path: 'test-mail-template',
    component: MailTesterComponent
  }]
}];

@NgModule({
  imports: [RouterModule.forRoot(routes, {
    useHash: true
  })],
  exports: [RouterModule]
})
export class AppRoutingModule { }
