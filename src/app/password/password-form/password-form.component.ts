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
  passwordForm = new FormGroup({
    name: this.nameCtrl,
    username: new FormControl(),
    siteLink: new FormControl(),
    password: new FormControl()
  });
  viewTitle = 'New Password';
  fieldConfigs = [{
    label: 'Name',
    name: 'name',
    type: 'text',
    control: this.nameCtrl,
    controlName: 'name'
  }, {
    label: 'Username',
    name: 'username',
    type: 'text',
    control: this.nameCtrl,
    controlName: 'name'
  }, {
    label: 'Site Link',
    name: 'siteLink',
    type: 'text',
    control: this.nameCtrl,
    controlName: 'name'
  }, {
    label: 'Password',
    name: 'password',
    type: 'password',
    control: this.nameCtrl,
    controlName: 'name'
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
