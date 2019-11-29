import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { UserService } from '../services/user.service';
import { Router } from '@angular/router';
import { MessageService } from '../shared/services/message.service';

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
  registrationForm = new FormGroup({
    username: this.usernameCtrl,
    password: this.passwordCtrl,
    confirmPassword: this.confirmPassCtrl,
    emailId: this.emailCtrl,
    mobileNo: this.mobileNoCtrl
  });
  constructor(private userService: UserService,
              private router: Router,
              private msgService: MessageService) { }

  ngOnInit() {
  }

  registerUser() {
    if (this.registrationForm.valid) {
      this.userService.registerUser(this.registrationForm.value).subscribe(
        response => {
          this.msgService.showSuccessMessage(response.message, 'center', 'top');
        },
        error => {
          const errorMsg = error.error ? error.error : error.statusText;
          this.msgService.showErrorMessage(errorMsg, 'center', 'top');
        }
      );
    }
  }

  loginUser() {
    this.router.navigate(['login']);
  }
}
