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
  passwordForm = new FormGroup({
    name: new FormControl('', Validators.required),
    username: new FormControl(),
    siteLink: new FormControl(),
    password: new FormControl()
  });
  viewTitle = 'New Password';
  fieldConfigs = [{
    label: 'Name',
    name: 'name',
    type: 'text',
    control: 'name'
  }, {
    label: 'Username',
    name: 'username',
    type: 'text',
    control: 'username'
  }, {
    label: 'Site Link',
    name: 'siteLink',
    type: 'text',
    control: 'siteLink'
  }, {
    label: 'Password',
    name: 'password',
    type: 'password',
    control: 'password'
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
}
