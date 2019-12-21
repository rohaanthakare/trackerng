import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { UserService } from '../services/user.service';
import { MessageService } from '../shared/services/message.service';

@Component({
  selector: 'app-reset-password',
  templateUrl: './reset-password.component.html',
  styleUrls: ['./reset-password.component.scss']
})
export class ResetPasswordComponent implements OnInit {
  passwordCtrl = new FormControl('', [Validators.required, Validators.minLength(6)]);
  confirmPassCtrl = new FormControl('', [Validators.required]);
  resetPasswordForm = new FormGroup({
    password: this.passwordCtrl,
    confirmPassword: this.confirmPassCtrl
  });
  userId: string;
  showLogin = false;

  constructor(private route: ActivatedRoute, private userService: UserService, private msgService: MessageService,
              private router: Router) { }

  ngOnInit() {
    this.route.paramMap.subscribe(
      params => {
        this.userId = params.get('id');
      }
    );
  }

  resetPassword(formDirective) {
    if (this.resetPasswordForm.valid) {
      this.resetPasswordForm.value.userId = this.userId;
      this.userService.resetPassword(this.resetPasswordForm.value).subscribe(
        response => {
          this.msgService.showSuccessMessage(response.message, 'center', 'top');
          this.resetPasswordForm.reset();
          formDirective.resetForm();
          this.router.navigate(['login']);
        }
      );
    }
  }

}
