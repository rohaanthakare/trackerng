import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, Validators } from '@angular/forms';

@Component({
  selector: 'app-contact-form',
  templateUrl: './contact-form.component.html',
  styleUrls: ['./contact-form.component.scss']
})
export class ContactFormComponent implements OnInit {
  titleDataSource = [];
  titleCtrl = new FormControl();
  middleNameCtrl = new FormControl();
  lastNameCtrl = new FormControl();
  firstNameCtrl = new FormControl('', Validators.required);
  mobileNoCtrl = new FormControl('', [Validators.minLength(10), Validators.maxLength(10)]);
  emailCtrl = new FormControl('', Validators.email);
  contactForm = this.formBuilder.group({
    title: this.titleCtrl,
    firstName: this.firstNameCtrl,
    middleName: this.middleNameCtrl,
    lastName: this.lastNameCtrl,
    mobileNo: this.mobileNoCtrl,
    email: this.emailCtrl
  });
  fieldConfigs = [];
  constructor(private formBuilder: FormBuilder) { }

  ngOnInit() {
    this.titleDataSource = [{
      _id: 'asdansjnjcv849384938',
      name: 'Mr.'
    }, {
      _id: 'asda34jnjcv849384938',
      name: 'Miss.'
    }, {
      _id: 'asdans345cv849384938',
      name: 'Mrs.'
    }];
    this.setFieldConfigs();
  }

  setFieldConfigs() {
    this.fieldConfigs = [{
      label: 'Title',
      name: 'title',
      type: 'select',
      control: this.titleCtrl,
      dataScource: this.titleDataSource,
      valueField: '_id',
      displayField: 'name',
      controlName: 'title'
    }, {
      label: 'First Name',
      name: 'firstName',
      type: 'text',
      control: this.firstNameCtrl,
      controlName: 'firstName'
    }, {
      label: 'Middle Name',
      name: 'middleName',
      type: 'text',
      control: this.middleNameCtrl,
      controlName: 'middleName'
    }, {
      label: 'Last Name',
      name: 'lastName',
      type: 'text',
      control: this.lastNameCtrl,
      controlName: 'lastName'
    }, {
      label: 'Mobile No.',
      name: 'mobileNo',
      type: 'number',
      control: this.mobileNoCtrl,
      controlName: 'mobileNo'
    }, {
      label: 'Email',
      name: 'email',
      type: 'text',
      control: this.emailCtrl,
      controlName: 'email'
    }];
  }

  createContact() {
    console.log('Inside create Contact');
    console.log(this.contactForm.value);
  }
}
