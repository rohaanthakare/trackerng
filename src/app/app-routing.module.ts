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
import { UnderConstructionComponent } from './under-construction/under-construction.component';


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
    loadChildren: () => import("./dashboard/dashboard.module").then(m => m.DashboardModule)
  }, {
    path: 'dashboard',
    loadChildren: () => import("./dashboard/dashboard.module").then(m => m.DashboardModule)
  }, {
    path: 'profile',
    component: ProfileComponent
  }, {
    path: 'password',
    loadChildren: () => import("./password/password.module").then(m => m.PasswordModule)
  }, {
    path: 'contact',
    loadChildren: () => import("./contact/contact.module").then(m => m.ContactModule)
  }, {
    path: 'finance',
    loadChildren: () => import("./finance/finance.module").then(m => m.FinanceModule)
  }, {
    path: 'grocery-list',
    loadChildren: () => import("./grocery/grocery.module").then(m => m.GroceryModule)
  }, {
    path: 'load-data',
    component: DataLoaderComponent
  }, {
    path: 'test-mail-template',
    component: MailTesterComponent
  }, {
    path: '**',
    component: UnderConstructionComponent
  }]
}];

@NgModule({
  imports: [RouterModule.forRoot(routes, {
    useHash: true
  })],
  exports: [RouterModule]
})
export class AppRoutingModule { }
