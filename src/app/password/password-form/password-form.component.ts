import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';

@Component({
  selector: 'app-password-form',
  templateUrl: './password-form.component.html',
  styleUrls: ['./password-form.component.scss']
})
export class PasswordFormComponent implements OnInit {
  passwordForm = new FormGroup({
    name: new FormControl(),
    username: new FormControl(),
    siteLink: new FormControl(),
    password: new FormControl()
  });
  constructor() { }

  ngOnInit() {
  }

}
