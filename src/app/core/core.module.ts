import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ModelListComponent } from './model-list/model-list.component';
import { ModelFormComponent } from './model-form/model-form.component';



@NgModule({
  declarations: [ModelListComponent, ModelFormComponent],
  imports: [
    CommonModule
  ]
})
export class CoreModule { }
