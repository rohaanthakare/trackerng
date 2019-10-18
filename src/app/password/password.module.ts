import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatTableModule } from '@angular/material/table';
import { MatGridListModule } from '@angular/material/grid-list';
import { PasswordListComponent } from './password-list/password-list.component';
import { PasswordFormComponent } from './password-form/password-form.component';
import { Routes, RouterModule } from '@angular/router';

const routes: Routes = [{
  path: '',
  children: [{
    path: '',
    component: PasswordListComponent
  }, {
    path: 'create',
    component: PasswordFormComponent
  }]
}];

@NgModule({
  declarations: [PasswordListComponent, PasswordFormComponent],
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    MatTableModule, MatGridListModule
  ]
})
export class PasswordModule { }
