import { Injectable } from '@angular/core';
import { UserService } from './user.service';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  isAuthorized: boolean = false;
  constructor(private userService: UserService) { }

  isUserAuthenticated() {
    return this.isAuthorized;
  }

  authenticateUser(username: string, password: string) {
    this.userService.authenticateUser(username, password).subscribe(
      data => {
        console.log("User Valid");
        console.log(data);
      },
      error => {
        console.log("User Invalid");
        console.log(error);
      }
    );
  }
}
