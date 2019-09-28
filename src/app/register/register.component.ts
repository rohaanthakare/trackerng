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
  confirmPassCtrl = new FormControl('',[Validators.required]);
  emailCtrl = new FormControl('',[Validators.required, Validators.email]);
  contactNoCtrl = new FormControl('', [Validators.required]);
  registrationForm = new FormGroup({
    username: new FormControl(),
    password: new FormControl(),
    confirmPassword: new FormControl(),
    emailId: new FormControl(),
    contactNo: new FormControl()
  });
  constructor(private userService: UserService,
              private router: Router,
              private msgService: MessageService) { }

  ngOnInit() {
  }

  registerUser() {
    this.userService.registerUser(this.registrationForm.value).subscribe(
      response => {
        this.msgService.showSuccessMessage(response.message, 'center', 'top')
      },
      error => {
        console.log('Inside error');
        console.log(error);
      }
    );
  }

  loginUser() {
    this.router.navigate(['login']);
  }
}
