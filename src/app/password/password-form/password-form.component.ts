import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { PasswordService } from '../services/password.service';
import { MessageService } from 'src/app/shared/services/message.service';

@Component({
  selector: 'app-password-form',
  templateUrl: './password-form.component.html',
  styleUrls: ['./password-form.component.scss']
})
export class PasswordFormComponent implements OnInit {
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
    errors: {
      name: 'required',
      message: 'Name is required field'
    }
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
    errors: {
      name: 'required',
      message: 'Password is required field'
    }
  }];
  constructor(private passwordService: PasswordService,
              private msgService: MessageService) { }

  ngOnInit() {
  }

  createPassword() {
    if (this.passwordForm.valid) {
      this.passwordService.createPassword(this.passwordForm.value).subscribe(
        (response: any) => {
          this.msgService.showSuccessMessage(response.message, 'center', 'top');
          this.passwordForm.reset();
        },
        error => {
          this.msgService.showSuccessMessage('Error while creation password, please try again', 'center', 'top');
        }
      );
    } else {
      this.msgService.showErrorMessage('Form contains error please correct.', 'center', 'top');
    }
  }

  getValidationMessage(field) {
    let returnMsg;
    switch (field) {
      case 'username':
        if (this.nameCtrl.hasError('required')) {
          returnMsg = 'Username is required';
        }
        break;
      case 'password':
        if (this.nameCtrl.hasError('required')) {
          returnMsg = 'Password is required';
        }
        break;
    }
    return returnMsg;
  }
}
