import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PasswordListComponent } from './password-list/password-list.component';
import { PasswordFormComponent } from './password-form/password-form.component';



@NgModule({
  declarations: [PasswordListComponent, PasswordFormComponent],
  imports: [
    CommonModule
  ]
})
export class PasswordModule { }
