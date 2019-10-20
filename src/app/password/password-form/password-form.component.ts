import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
import { PasswordService } from '../services/password.service';
import { MessageService } from 'src/app/shared/services/message.service';

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
  constructor(private passwordService: PasswordService,
              private msgService: MessageService) { }

  ngOnInit() {
  }

  createPassword() {
    this.passwordService.createPassword(this.passwordForm.value).subscribe(
      (response: any) => {
        this.msgService.showSuccessMessage(response.message, 'center', 'top');
        this.passwordForm.reset();
      },
      error => {
        console.log('Create Password Error');
        console.log(error);
      }
    );
  }
}
