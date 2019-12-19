import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { UserService } from '../services/user.service';

@Component({
  selector: 'app-user-activation',
  templateUrl: './user-activation.component.html',
  styleUrls: ['./user-activation.component.scss']
})
export class UserActivationComponent implements OnInit {
  userId: string;
  activationStarted;
  activationStatus;
  constructor(private route: ActivatedRoute, private userService: UserService, private router: Router) { }

  ngOnInit() {
    this.activationStarted = true;
    this.route.paramMap.subscribe(
      params => {
        this.userId = params.get('id');
        if (this.userId) {
          this.userService.activateUser(this.userId).subscribe(
            (response: any) => {
              console.log('Success');
              this.activationStarted = false;
              if (response.status) {
                this.activationStatus = true;
              } else {
                this.activationStatus = false;
              }
              console.log(response);
            },
            error => {
              this.activationStarted = false;
              this.activationStatus = false;
            }
          );
        }
      }
    );
  }

  openLogin() {
    this.router.navigate(['login']);
  }
}
