import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { FormGroup, FormControl, Validators, FormBuilder } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { UserService } from '../services/user.service';
import { MessageService } from '../shared/services/message.service';
import { HelperService } from '../shared/services/helper.service';

@Component({
  selector: 'app-reset-password',
  templateUrl: './reset-password.component.html',
  styleUrls: ['./reset-password.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class ResetPasswordComponent implements OnInit {
  passwordCtrl = new FormControl('', [Validators.required, Validators.minLength(6)]);
  confirmPassCtrl = new FormControl('', [Validators.required]);
  resetPasswordForm = this.formBuilder.group({
    password: this.passwordCtrl,
    confirmPassword: this.confirmPassCtrl
  }, {
    validator: this.helperService.mustMatchValidator('password', 'confirmPassword')
  });
  userId: string;
  showLogin = false;

  constructor(private route: ActivatedRoute, private userService: UserService, private msgService: MessageService,
              private router: Router, private formBuilder: FormBuilder, private helperService: HelperService) { }

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
        (response: any) => {
          this.msgService.showSuccessMessage(response.message, 'center', 'top');
          this.resetPasswordForm.reset();
          formDirective.resetForm();
          this.router.navigate(['login']);
        }
      );
    }
  }

}
