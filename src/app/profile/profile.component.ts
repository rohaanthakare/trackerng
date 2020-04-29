import { Component, OnInit, ViewChild, ViewEncapsulation } from '@angular/core';
import { FormGroup, FormBuilder, FormControl } from '@angular/forms';
import { ModelFormComponent } from '../core/model-form/model-form.component';
import { MasterDataService } from '../services/master-data.service';
import { UserService } from '../services/user.service';
import { AuthService } from '../services/auth.service';
import { HelperService } from '../shared/services/helper.service';
import { MessageService } from '../shared/services/message.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class ProfileComponent implements OnInit {
  @ViewChild('personalDetails', {static: true}) personalDetails: ModelFormComponent;
  userId: any;
  formTitle: any;
  personalDetailsFields = [];
  genderData = [];
  isGenderDataLoaded = false;
  usernameCtrl = new FormControl();
  firstNameCtrl = new FormControl();
  middleNameCtrl = new FormControl();
  lastNameCtrl = new FormControl();
  displayNameCtrl = new FormControl();
  dobCtrl = new FormControl();
  genderCtrl = new FormControl();
  mobileNoCtrl = new FormControl();
  emailCtrl = new FormControl();
  profileForm: FormGroup = this.formBuilder.group({
    username: this.usernameCtrl,
    firstName: this.firstNameCtrl,
    middleName: this.middleNameCtrl,
    lastName: this.lastNameCtrl,
    displayName: this.displayNameCtrl,
    dateOfBirth: this.dobCtrl,
    gender: this.genderCtrl,
    emailId: this.emailCtrl,
    mobileNo: this.mobileNoCtrl
  });
  constructor(private formBuilder: FormBuilder, private masterDataService: MasterDataService, private userService: UserService,
              private authService: AuthService, private helperService: HelperService, private notification: MessageService) { }

  ngOnInit() {
    this.userId = this.authService.getCurrentUser()._id;
    this.masterDataService.getMasterDataForParent('GENDER').subscribe(
      (response: any) => {
        this.genderData = response.data;
        this.isGenderDataLoaded = true;
        this.prerequisiteDataLoaded();
      }
    );
  }

  getUserProfile() {
    this.userService.getUserProfile(this.userId).subscribe(
      (response: any) => {
        console.log('-----Inside get User profile');
        console.log(response);
        this.personalDetails.setValues(response.user);
        if (response.user.firstName) {
          this.formTitle = this.helperService.convertToTitleCase(response.user.firstName);
          if (response.user.lastName) {
            this.formTitle = this.formTitle + ' ' + this.helperService.convertToTitleCase(response.user.lastName);
          }
        } else {
          this.formTitle = this.helperService.convertToTitleCase(response.user.username);
        }
      }
    );
  }

  prerequisiteDataLoaded() {
    if (this.isGenderDataLoaded) {
      this.setPersonalDetailsFormFields();
      this.getUserProfile();
    }
  }

  setPersonalDetailsFormFields() {
    this.personalDetailsFields = [];
    this.personalDetailsFields.push({
      label: 'Username',
      name: 'username',
      type: 'text',
      control: this.usernameCtrl,
      controlName: 'username',
      styleClass: 'col-12 col-sm-12 col-md-6 col-lg-6 col-xl-6'
    });

    this.personalDetailsFields.push({
      label: 'Display Name',
      name: 'displayName',
      type: 'text',
      control: this.displayNameCtrl,
      controlName: 'displayName',
      styleClass: 'col-12 col-sm-12 col-md-6 col-lg-6 col-xl-6'
    });

    this.personalDetailsFields.push({
      label: 'First Name',
      name: 'firstName',
      type: 'text',
      control: this.firstNameCtrl,
      controlName: 'firstName',
      styleClass: 'col-12 col-sm-12 col-md-6 col-lg-6 col-xl-6'
    });

    this.personalDetailsFields.push({
      label: 'Last Name',
      name: 'lastName',
      type: 'text',
      control: this.lastNameCtrl,
      controlName: 'lastName',
      styleClass: 'col-12 col-sm-12 col-md-6 col-lg-6 col-xl-6'
    });

    this.personalDetailsFields.push({
      label: 'Date of Birth',
      name: 'dateOfBirth',
      type: 'date',
      control: this.dobCtrl,
      controlName: 'dateOfBirth',
      styleClass: 'col-12 col-sm-12 col-md-6 col-lg-6 col-xl-6'
    });
    this.personalDetailsFields.push({
      label: 'Gender',
      name: 'gender',
      type: 'select',
      dataScource: this.genderData,
      valueField: '_id',
      displayField: 'configName',
      control: this.genderCtrl,
      controlName: 'gender',
      styleClass: 'col-12 col-sm-12 col-md-6 col-lg-6 col-xl-6'
    });

    this.personalDetailsFields.push({
      label: 'Email',
      name: 'emailId',
      type: 'text',
      control: this.emailCtrl,
      controlName: 'emailId',
      disabled: true,
      styleClass: 'col-12 col-sm-12 col-md-6 col-lg-6 col-xl-6 field-disabled'
    });

    this.personalDetailsFields.push({
      label: 'Mobile No.',
      name: 'mobileNo',
      type: 'number',
      control: this.mobileNoCtrl,
      controlName: 'mobileNo',
      disabled: true,
      styleClass: 'col-12 col-sm-12 col-md-6 col-lg-6 col-xl-6 field-disabled'
    });

    this.personalDetails.setFieldConfigs(this.personalDetailsFields);
  }

  resetForm() {}

  updateProfile() {
    if (this.profileForm.valid) {
      this.profileForm.value.dateOfBirth = this.helperService.getUTCDate(this.profileForm.value.dateOfBirth);
      this.userService.updateUserProfile(this.userId, this.profileForm.value).subscribe(
        (response: any) => {
          this.notification.showSuccessMessage(response.message);
        },
        error => {
          const errorMsg = error.error ? error.error.message : error.statusText;
          this.notification.showErrorMessage(errorMsg);
        }
      );
    } else {
      this.notification.showErrorMessage('Form contains error, please correct.');
    }
  }
}
