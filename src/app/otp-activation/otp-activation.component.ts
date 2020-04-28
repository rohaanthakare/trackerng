import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormControl } from '@angular/forms';
import { UserService } from '../services/user.service';
import { ActivatedRoute, Router } from '@angular/router';
import { MessageService } from '../shared/services/message.service';

@Component({
  selector: 'app-otp-activation',
  templateUrl: './otp-activation.component.html',
  styleUrls: ['./otp-activation.component.scss']
})
export class OtpActivationComponent implements OnInit {
  activationForm: FormGroup = this.formBuilder.group({
    key1: new FormControl(),
    key2: new FormControl(),
    key3: new FormControl(),
    key4: new FormControl(),
    key5: new FormControl(),
    key6: new FormControl()
  });
  userId: any;
  constructor(private formBuilder: FormBuilder, private userService: UserService, private route: ActivatedRoute, private router: Router,
              private notification: MessageService) { }

  ngOnInit() {
    this.route.paramMap.subscribe(
      params => {
        this.userId = params.get('id');
        if (!this.userId) {
          this.router.navigate(['']);
        }
      }
    );
  }

  activateUserByOtp() {
    if (this.activationForm.valid) {
      let userOtp = '';
      for (const key in this.activationForm.value) {
        if (key) {
          userOtp += this.activationForm.value[key];
        }
      }

      this.userService.activateUserByOtp(this.userId, parseInt(userOtp, null)).subscribe(
        response => {
          this.notification.showSuccessMessage(response.message);
          this.activationForm.reset();
          this.router.navigate(['login']);
        },
        error => {
          // const errorMsg = error.error ? error.error.message : error.statusText;
          this.notification.showErrorMessage(error);
          this.activationForm.reset();
        }
      );
    } else {
      this.notification.showErrorMessage('Please enter OTP');
    }
  }

  moveFocus(nextElement) {
    nextElement.focus();
  }

}
