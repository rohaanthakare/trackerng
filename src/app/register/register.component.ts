import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
import { UserService } from '../services/user.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {
  registrationForm = new FormGroup({
    username: new FormControl(),
    password: new FormControl(),
    confirmPassword: new FormControl(),
    emailId: new FormControl(),
    contactNo: new FormControl()
  });
  constructor(private userService: UserService) { }

  ngOnInit() {
  }

  registerUser() {
    console.log('Inside Register USer');
    console.log(this.registrationForm.value);
    this.userService.registerUser(this.registrationForm.value).subscribe(
      response => {
        console.log('Success');
        console.log(response);
      },
      error => {
        console.log('Failed');
        console.log(error);
      }
    );
  }
}
