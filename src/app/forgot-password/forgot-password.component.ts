import { Component, OnInit } from '@angular/core';
import { FormControl, Validators, FormGroup } from '@angular/forms';
import { UserService } from '../services/user.service';
import { MessageService } from '../shared/services/message.service';

@Component({
  selector: 'app-forgot-password',
  templateUrl: './forgot-password.component.html',
  styleUrls: ['./forgot-password.component.scss']
})
export class ForgotPasswordComponent implements OnInit {
  emailCtrl = new FormControl('', [Validators.required, Validators.email]);
  forgotPassForm = new FormGroup({
    emailId: this.emailCtrl
  });
  constructor(private userService: UserService, private msgService: MessageService) { }

  ngOnInit() {
  }

  forgotPassword(formDirective) {
    if (this.forgotPassForm.valid) {
      this.userService.sendPasswordResetLink(this.forgotPassForm.value).subscribe(
        response => {
          this.msgService.showSuccessMessage(response.message, 'center', 'top');
          this.forgotPassForm.reset();
          formDirective.resetForm();
        },
        error => {
          const errorMsg = error.error ? error.error.message : error.statusText;
          this.msgService.showErrorMessage(errorMsg, 'center', 'top');
        }
      );
    }
  }
}
