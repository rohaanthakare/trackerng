// Core Imports
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';

// Angular Material Imports 
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatSnackBarModule } from '@angular/material/snack-bar';

// Application Imports
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomeComponent } from './home/home.component';
import { LoginComponent } from './login/login.component';
import { ProfileComponent } from './profile/profile.component';
import { MenuComponent } from './menu/menu.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { AuthService } from './services/auth.service';
import { UserService } from './services/user.service';
import { RegisterComponent } from './register/register.component';
import { ForgotPasswordComponent } from './forgot-password/forgot-password.component';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    LoginComponent,
    ProfileComponent,
    MenuComponent,
    DashboardComponent,
    RegisterComponent,
    ForgotPasswordComponent
  ],
  imports: [
    BrowserModule, BrowserAnimationsModule, FormsModule, HttpClientModule, ReactiveFormsModule,
    MatInputModule, MatButtonModule, MatIconModule, MatSnackBarModule,
    AppRoutingModule
  ],
  providers: [ AuthService, UserService],
  bootstrap: [AppComponent]
})
export class AppModule { }
