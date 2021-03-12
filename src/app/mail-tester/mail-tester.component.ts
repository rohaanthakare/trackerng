import { Component, OnInit } from '@angular/core';
import { UserService } from '../services/user.service';

@Component({
  selector: 'app-mail-tester',
  templateUrl: './mail-tester.component.html',
  styleUrls: ['./mail-tester.component.scss']
})
export class MailTesterComponent implements OnInit {
  mailTemplates = [{
    code: 'TRACKER_MAIL',
    name: 'Tracker Mail',
  }, {
    code: 'ACTIVATION_MAIL',
    name: 'Activation Mail',
  }, {
    code: 'RESET_PASSWORD_MAIL',
    name: 'Reset Password Mail',
  }, {
    code: 'INVITATION_MAIL',
    name: 'Invitation Mail',
  }, {
    code: 'WELCOME_MAIL',
    name: 'Welcome Mail',
  }, {
    code: 'DAILY_STATUS_MAIL',
    name: 'Daily Status Mail',
  }, {
    code: 'GROCERY_LIST_MAIL',
    name: 'Grocery List Mail',
  }];
  mailTemplate: string;
  constructor(private userService: UserService) { }

  ngOnInit() {
  }

  sendMail() {
    this.userService.testMailTemplate(this.mailTemplate).subscribe(
      response => {
        console.log(response);
      }
    );
  }
}
