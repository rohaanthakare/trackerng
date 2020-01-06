import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators, FormGroupDirective, FormBuilder } from '@angular/forms';
import { UserService } from '../services/user.service';
import { Router } from '@angular/router';
import { MessageService } from '../shared/services/message.service';
import { Roles } from '../models/role.model';
import { UserStatus } from '../models/user.model';
import { HelperService } from '../shared/services/helper.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {
  usernameCtrl = new FormControl('', [Validators.required]);
  passwordCtrl = new FormControl('', [Validators.required, Validators.minLength(6)]);
  confirmPassCtrl = new FormControl('', [Validators.required]);
  emailCtrl = new FormControl('', [Validators.required, Validators.email]);
  mobileNoCtrl = new FormControl('', [Validators.required]);
  registrationForm = this.formBuilder.group({
    username: this.usernameCtrl,
    password: this.passwordCtrl,
    confirmPassword: this.confirmPassCtrl,
    emailId: this.emailCtrl,
    mobileNo: this.mobileNoCtrl
  }, {
    validator: this.helperService.mustMatchValidator('password', 'confirmPassword')
  });
  constructor(private userService: UserService,
              private router: Router,
              private msgService: MessageService,
              private helperService: HelperService,
              private formBuilder: FormBuilder) { }

  ngOnInit() {
  }

  registerUser(formDirective: FormGroupDirective) {
    if (this.registrationForm.valid) {
      this.registrationForm.value.role = Roles.TRACKER_USER;
      this.registrationForm.value.status = UserStatus.NEW;
      this.userService.registerUser(this.registrationForm.value).subscribe(
        response => {
          this.msgService.showSuccessMessage(response.message, 'center', 'top');
          this.registrationForm.reset();
          formDirective.resetForm();
        },
        error => {
          const errorMsg = error.error ? error.error.message : error.statusText;
          this.msgService.showErrorMessage(errorMsg, 'center', 'top');
        }
      );
    }
  }

  loginUser() {
    this.router.navigate(['login']);
  }
}
