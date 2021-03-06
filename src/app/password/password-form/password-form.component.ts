import { Component, OnInit, ViewChild } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { PasswordService } from '../services/password.service';
import { MessageService } from 'src/app/shared/services/message.service';
import { ActivatedRoute } from '@angular/router';
import { ModelFormComponent } from 'src/app/core/model-form/model-form.component';

@Component({
  selector: 'app-password-form',
  templateUrl: './password-form.component.html',
  styleUrls: ['./password-form.component.scss']
})
export class PasswordFormComponent implements OnInit {
  @ViewChild(ModelFormComponent, {static: false}) modelForm: ModelFormComponent;
  passwordId: string;
  name: string;
  actionType: string;
  passwordDetail: any;
  nameCtrl = new FormControl('', Validators.required);
  usernameCtrl = new FormControl();
  siteLinkCtrl = new FormControl();
  passwordCtrl = new FormControl('', [Validators.required]);
  passwordForm = new FormGroup({
    name: this.nameCtrl,
    username: this.usernameCtrl,
    siteLink: this.siteLinkCtrl,
    password: this.passwordCtrl
  });
  viewTitle = 'New Password';
  fieldConfigs = [{
    label: 'Name',
    name: 'name',
    type: 'text',
    control: this.nameCtrl,
    controlName: 'name',
    errors: [{
      name: 'required',
      message: 'Name is required field'
    }]
  }, {
    label: 'Username',
    name: 'username',
    type: 'text',
    control: this.usernameCtrl,
    controlName: 'username'
  }, {
    label: 'Site Link',
    name: 'siteLink',
    type: 'text',
    control: this.siteLinkCtrl,
    controlName: 'siteLink'
  }, {
    label: 'Password',
    name: 'password',
    type: 'password',
    control: this.passwordCtrl,
    controlName: 'password',
    errors: [{
      name: 'required',
      message: 'Password is required field'
    }]
  }];
  constructor(private passwordService: PasswordService,
              private msgService: MessageService,
              private route: ActivatedRoute) { }

  ngOnInit() {
    this.route.paramMap.subscribe(
      params => {
        this.passwordId = params.get('id');
        if (this.passwordId) {
          this.actionType = 'edit';
          this.getPasswordDetails();
        }
      }
    );
  }

  getPasswordDetails() {
    this.passwordService.getPasswordDetail(this.passwordId).subscribe(
      (response: any) => {
        this.passwordDetail = response.password;
        this.name = response.password.name;
        this.modelForm.setValues(this.passwordDetail);
      }
    );
  }

  createPassword() {
    if (this.passwordForm.valid) {
      if (this.passwordId) {
        this.passwordService.updatePassword(this.passwordId, this.passwordForm.value).subscribe(
          (response: any) => {
            this.modelForm.handleSuccess(response, 'password', 'password', 'edit');
          },
          error => {
            this.msgService.showErrorMessage('Error while updating password, please try again', 'center', 'top');
          }
        );
      } else {
        this.passwordService.createPassword(this.passwordForm.value).subscribe(
          (response: any) => {
            this.modelForm.handleSuccess(response, 'password', 'password');
          },
          error => {
            this.msgService.showErrorMessage('Error while creation password, please try again', 'center', 'top');
          }
        );
      }
    } else {
      this.msgService.showErrorMessage('Form contains error please correct.', 'center', 'top');
    }
  }
}
