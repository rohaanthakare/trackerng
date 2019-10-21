import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { MatButtonModule } from '@angular/material/button';
import { MatTableModule } from '@angular/material/table';

import { ModelListComponent } from './model-list/model-list.component';
import { ModelFormComponent } from './model-form/model-form.component';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MessageSnackBarComponent } from './message-snack-bar/message-snack-bar.component';
import { MatInputModule } from '@angular/material/input';

@NgModule({
  declarations: [ModelListComponent, ModelFormComponent, MessageSnackBarComponent],
  imports: [
    CommonModule, FormsModule, ReactiveFormsModule,
    MatButtonModule, MatTableModule, MatPaginatorModule, MatInputModule
  ],
  exports: [ModelListComponent, ModelFormComponent]
})
export class CoreModule { }
