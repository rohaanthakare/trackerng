import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MatButtonModule } from '@angular/material/button';
import { MatTableModule } from '@angular/material/table';

import { ModelListComponent } from './model-list/model-list.component';
import { ModelFormComponent } from './model-form/model-form.component';
import { MatPaginatorModule } from '@angular/material/paginator';

@NgModule({
  declarations: [ModelListComponent, ModelFormComponent],
  imports: [
    CommonModule,
    MatButtonModule, MatTableModule, MatPaginatorModule
  ],
  exports: [ModelListComponent]
})
export class CoreModule { }
