import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { AuthService } from '../services/auth.service';
import { Router } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MessageService } from '../shared/services/message.service';
import { FormGroup, FormControl, Validators } from '@angular/forms';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class LoginComponent implements OnInit {
  username: string;
  password: string;
  usernameCtrl = new FormControl('', [Validators.required]);
  passwordCtrl = new FormControl('', [Validators.required]);
  loginForm = new FormGroup({
    username: this.usernameCtrl,
    password: this.passwordCtrl
  });
  constructor(private authService: AuthService,
              private router: Router,
              private messageService: MessageService) { }

  ngOnInit() {
  }

  authenticateUser() {
    if (this.loginForm.valid) {
      this.authService.authenticateUser(this.loginForm.value).subscribe(
        (response: any) => {
          if (response.status) {
            this.router.navigate(['home']);
          } else {
            this.messageService.showErrorMessage(response.message, 'center', 'top');
          }
        },
        error => {
          let errorMsg;
          if (typeof error === 'string') {
            errorMsg = error;
          } else {
            errorMsg = (error.error) ? error.error.message : error.statusText;
          }
          this.messageService.showErrorMessage(errorMsg, 'center', 'top');
        }
      );
    }
  }

  registerUser() {
    this.router.navigate(['register']);
  }

  getVaidationMessage(field) {
    let returnMsg;
    switch (field) {
      case 'username':
        if (this.usernameCtrl.hasError('required')) {
          returnMsg = 'Username is required';
        }
        break;
      case 'password':
        if (this.passwordCtrl.hasError('required')) {
          returnMsg = 'Password is required';
        }
        break;
    }
    return returnMsg;
  }

  forgotPassword() {
    this.router.navigate(['forgot-pass']);
  }
}
