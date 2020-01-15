import { Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormControl, Validators } from '@angular/forms';
import { ContactService } from '../contact.service';
import { MasterDataService } from 'src/app/services/master-data.service';
import { ModelFormComponent } from 'src/app/core/model-form/model-form.component';
import { ActivatedRoute } from '@angular/router';
import { HelperService } from 'src/app/shared/services/helper.service';
import { MessageService } from 'src/app/shared/services/message.service';

@Component({
  selector: 'app-contact-form',
  templateUrl: './contact-form.component.html',
  styleUrls: ['./contact-form.component.scss']
})
export class ContactFormComponent implements OnInit {
  @ViewChild(ModelFormComponent, {static: false}) modelForm: ModelFormComponent;
  contactId: string;
  actionType: string;
  contactDetails: any;
  name: string;
  titleDataSource = [];
  isTitleLoaded = false;
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
  fieldConfigs: any;

  constructor(private formBuilder: FormBuilder, private contactService: ContactService, private helperService: HelperService,
              private masterDataService: MasterDataService, private route: ActivatedRoute, private msgService: MessageService) { }

  ngOnInit() {
    this.route.paramMap.subscribe(
      params => {
        this.contactId = params.get('id');
        if (this.contactId) {
          this.actionType = 'edit';
        }
      }
    );

    this.masterDataService.getMasterDataForParent('TITLE').subscribe(
      (response: any) => {
        this.titleDataSource = response.data;
        this.isTitleLoaded = true;
        this.allDataLoaded();
      }
    );
  }

  allDataLoaded() {
    if (this.isTitleLoaded) {
      this.modelForm.setFieldConfigs(this.getFieldConfigs());
      this.getContactDetails();
    }
  }

  getFieldConfigs() {
    return [{
      label: 'Title',
      name: 'title',
      type: 'select',
      control: this.titleCtrl,
      dataScource: this.titleDataSource,
      valueField: '_id',
      displayField: 'configName',
      controlName: 'title'
    }, {
      label: 'First Name',
      name: 'firstName',
      type: 'text',
      control: this.firstNameCtrl,
      controlName: 'firstName',
      errors: {
        name: 'required',
        message: 'First Name is required field'
      }
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
      controlName: 'email',
      errors: {
        name: 'email',
        message: 'Please enter valid email address'
      }
    }];
  }

  getContactDetails() {
    if (this.contactId) {
      this.contactService.getContactDetail(this.contactId).subscribe(
        (response: any) => {
          this.contactDetails = response.contact;
          let formTitle = this.helperService.convertToTitleCase(response.contact.firstName);
          const lastName = (response.contact.lastName) ? this.helperService.convertToTitleCase(response.contact.lastName) : '';
          formTitle = formTitle + ' ' + lastName;
          this.name = formTitle;
          this.modelForm.setValues(this.contactDetails);
        }
      );
    }
  }

  createContact() {
    if (this.contactForm.valid) {
      if (this.contactId) {

      } else {
        this.contactService.createUserContact(this.contactForm.value).subscribe(
          response => {
            this.modelForm.handleSuccess(response, '/home/contact/edit');
          },
          error => {
            const errorMsg = error.error ? error.error.message : error.statusText;
            this.msgService.showErrorMessage(errorMsg, 'center', 'top');
          }
        );
      }
    }
  }
}
