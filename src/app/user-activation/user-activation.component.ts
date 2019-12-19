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
  constructor(private route: ActivatedRoute, private userService: UserService) { }

  ngOnInit() {
    this.activationStarted = true;
    this.route.paramMap.subscribe(
      params => {
        this.userId = params.get('id');
        if (this.userId) {
          this.userService.activateUser(this.userId).subscribe(
            response => {
              console.log('Success');
              this.activationStarted = false;
              console.log(response);
            },
            error => {
              console.log('Error');
              console.log(error);
            }
          );
        }
      }
    );
  }

}
