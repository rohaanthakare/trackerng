// Core Imports
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';

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
import { MatTabsModule } from '@angular/material/tabs';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';

import { NgxChartsModule } from '@swimlane/ngx-charts';

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
import { OuterComponent } from './outer/outer.component';
import { OuterHomeComponent } from './outer-home/outer-home.component';
import { AboutComponent } from './about/about.component';
import { SkillComponent } from './skill/skill.component';
import { EducationComponent } from './education/education.component';
import { ExperienceComponent } from './experience/experience.component';
import { WorkComponent } from './work/work.component';
import { ContactMeComponent } from './contact-me/contact-me.component';
import { AuthInterceptorService } from './services/auth-interceptor.service';
import { UserActivationComponent } from './user-activation/user-activation.component';
import { ResetPasswordComponent } from './reset-password/reset-password.component';
import { DatePipe, CurrencyPipe } from '@angular/common';
import { ErrorInterceptor } from './services/error-interceptor.service';
import { LoaderComponent } from './loader/loader.component';
import { LoaderInterceptorService } from './services/loader-interceptor.service';
import { LoaderService } from './services/loader.service';
import { OtpActivationComponent } from './otp-activation/otp-activation.component';

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
    OuterHeaderComponent,
    OuterComponent,
    OuterHomeComponent,
    AboutComponent,
    SkillComponent,
    EducationComponent,
    ExperienceComponent,
    WorkComponent,
    ContactMeComponent,
    UserActivationComponent,
    ResetPasswordComponent,
    LoaderComponent,
    OtpActivationComponent
  ],
  imports: [
    BrowserModule, BrowserAnimationsModule, FormsModule, HttpClientModule, ReactiveFormsModule,
    MatInputModule, MatButtonModule, MatIconModule, MatSnackBarModule, MatToolbarModule,
    MatCardModule, MatMenuModule, MatProgressBarModule, MatGridListModule, MatExpansionModule,
    MatSidenavModule, MatListModule, MatTabsModule, MatProgressSpinnerModule, NgxChartsModule,
    CoreModule, AppRoutingModule
  ],
  entryComponents: [ MessageSnackBarComponent],
  providers: [ { provide: HTTP_INTERCEPTORS, useClass: AuthInterceptorService, multi: true},
    { provide: HTTP_INTERCEPTORS, useClass: ErrorInterceptor, multi: true },
    LoaderService,
    { provide: HTTP_INTERCEPTORS, useClass: LoaderInterceptorService, multi: true },
    AuthService, UserService, DatePipe, CurrencyPipe],
  bootstrap: [AppComponent]
})
export class AppModule { }
