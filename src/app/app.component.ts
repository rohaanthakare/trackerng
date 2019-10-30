import { Component, OnInit } from '@angular/core';
import { AuthService } from './services/auth.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  title = 'Tracker';
  isPublicPage = true;
  constructor(private authService: AuthService) {}
  ngOnInit() {
    if (this.authService.isUserAuthenticated()) {
      console.log('Hide outer header');
    } else {
      console.log('show outer header');
    }
  }
}
