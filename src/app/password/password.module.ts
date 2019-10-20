import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { MatTableModule } from '@angular/material/table';
import { MatGridListModule } from '@angular/material/grid-list';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatButtonModule } from '@angular/material/button';
import { MatInputModule } from '@angular/material/input';

import { PasswordListComponent } from './password-list/password-list.component';
import { PasswordFormComponent } from './password-form/password-form.component';
import { Routes, RouterModule } from '@angular/router';
import { CoreModule } from '../core/core.module';

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
    CommonModule, FormsModule, ReactiveFormsModule,
    RouterModule.forChild(routes), MatButtonModule, MatInputModule,
    MatTableModule, MatGridListModule, MatPaginatorModule,
    CoreModule
  ]
})
export class PasswordModule { }
