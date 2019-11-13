import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ContactListComponent } from './contact-list/contact-list.component';
import { ContactFormComponent } from './contact-form/contact-form.component';
import { Routes, RouterModule } from '@angular/router';

const routes: Routes = [{
  path: '',
  children: [{
    path: '',
    component: ContactListComponent
  }, {
    path: 'create',
    component: ContactFormComponent
  }, {
    path: 'edit/:id',
    component: ContactFormComponent
  }]
}];

@NgModule({
  declarations: [ContactListComponent, ContactFormComponent],
  imports: [
    CommonModule,
    RouterModule.forChild(routes)
  ]
})
export class ContactModule { }
