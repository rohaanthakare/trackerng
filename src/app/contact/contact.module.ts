import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ContactListComponent } from './contact-list/contact-list.component';
import { ContactFormComponent } from './contact-form/contact-form.component';



@NgModule({
  declarations: [ContactListComponent, ContactFormComponent],
  imports: [
    CommonModule
  ]
})
export class ContactModule { }
