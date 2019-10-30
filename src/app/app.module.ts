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
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatCardModule } from '@angular/material/card';
import { MatMenuModule } from '@angular/material/menu';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { MatGridListModule } from '@angular/material/grid-list';
import { MatExpansionModule } from '@angular/material/expansion';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatListModule } from '@angular/material/list';

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
import { HeaderComponent } from './header/header.component';
import { DataLoaderComponent } from './data-loader/data-loader.component';
import { MenuItemComponent } from './menu/menu-item/menu-item.component';
import { MessageSnackBarComponent } from './core/message-snack-bar/message-snack-bar.component';
import { CoreModule } from './core/core.module';
import { OuterHeaderComponent } from './outer-header/outer-header.component';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    LoginComponent,
    ProfileComponent,
    MenuComponent,
    DashboardComponent,
    RegisterComponent,
    ForgotPasswordComponent,
    HeaderComponent,
    DataLoaderComponent,
    MenuItemComponent,
    OuterHeaderComponent
  ],
  imports: [
    BrowserModule, BrowserAnimationsModule, FormsModule, HttpClientModule, ReactiveFormsModule,
    MatInputModule, MatButtonModule, MatIconModule, MatSnackBarModule, MatToolbarModule,
    MatCardModule, MatMenuModule, MatProgressBarModule, MatGridListModule, MatExpansionModule,
    MatSidenavModule, MatListModule,
    CoreModule, AppRoutingModule
  ],
  entryComponents: [ MessageSnackBarComponent],
  providers: [ AuthService, UserService],
  bootstrap: [AppComponent]
})
export class AppModule { }
