import { Component, OnInit } from '@angular/core';
import { AuthService } from '../services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  username: string;
  password: string;
  constructor(private authService: AuthService,
              private router: Router) { }

  ngOnInit() {
  }

  authenticateUser() {
    this.authService.authenticateUser(this.username, this.password).subscribe(
      data => {
        this.router.navigate(['home']);
      },
      error => {
        console.log('Error');
      }
    );
  }
}
