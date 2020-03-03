import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { MatNativeDateModule } from '@angular/material/core';
import { MatButtonModule } from '@angular/material/button';
import { MatTableModule } from '@angular/material/table';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatChipsModule } from '@angular/material/chips';

import { ModelListComponent } from './model-list/model-list.component';
import { ModelFormComponent } from './model-form/model-form.component';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MessageSnackBarComponent } from './message-snack-bar/message-snack-bar.component';
import { MatInputModule } from '@angular/material/input';
import { ModelSelectComponent } from './model-select/model-select.component';
import { ModelEditorGridComponent } from './model-editor-grid/model-editor-grid.component';
import { ModelSelectionListComponent } from './model-selection-list/model-selection-list.component';

@NgModule({
  entryComponents: [MessageSnackBarComponent],
  declarations: [ModelListComponent, ModelFormComponent, MessageSnackBarComponent,
    ModelSelectComponent,
    ModelEditorGridComponent,
    ModelSelectionListComponent],
  imports: [
    CommonModule, FormsModule, ReactiveFormsModule,
    MatButtonModule, MatTableModule, MatPaginatorModule, MatInputModule, MatAutocompleteModule, MatDatepickerModule,
    MatNativeDateModule, MatChipsModule
  ],
  exports: [ModelListComponent, ModelFormComponent, MessageSnackBarComponent]
})
export class CoreModule { }
