import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatListModule } from '@angular/material/list';
import { MatButtonModule } from '@angular/material/button';
import { GroceryListComponent } from './grocery-list/grocery-list.component';
import { GroceryFormComponent } from './grocery-form/grocery-form.component';
import { Routes, RouterModule } from '@angular/router';
import { CoreModule } from '../core/core.module';
import { MyGroceryListComponent } from './my-grocery-list/my-grocery-list.component';

const routes: Routes = [{
  path: '',
  component: GroceryListComponent
}, {
  path: 'create',
  component: GroceryFormComponent
}, {
  path: 'edit/:id',
  component: GroceryFormComponent
}];

@NgModule({
  entryComponents: [MyGroceryListComponent],
  declarations: [GroceryListComponent, GroceryFormComponent, MyGroceryListComponent],
  imports: [
    CommonModule, RouterModule.forChild(routes), CoreModule, MatListModule, MatButtonModule
  ]
})
export class GroceryModule { }
