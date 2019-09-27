import { Component, OnInit } from '@angular/core';
import { AuthService } from '../services/auth.service';
import { Router } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MessageService } from '../shared/services/message.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  username: string;
  password: string;
  constructor(private authService: AuthService,
              private router: Router,
              private messageService: MessageService) { }

  ngOnInit() {
  }

  authenticateUser() {
    this.authService.authenticateUser(this.username, this.password).subscribe(
      data => {
        this.router.navigate(['home']);
      },
      error => {
        const errorMsg = (error.error) ? error.error : error.statusText;
        this.messageService.showErrorMessage(errorMsg, 'default');
      }
    );
  }
}
