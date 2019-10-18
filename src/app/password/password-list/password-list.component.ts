import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-password-list',
  templateUrl: './password-list.component.html',
  styleUrls: ['./password-list.component.scss']
})
export class PasswordListComponent implements OnInit {
  displayedColumns: string[] = ['name', 'siteLink'];
  passwords = [{
    name: 'Gmail',
    siteLink: 'www.gmail.com'
  }, {
    name: 'Facebook',
    siteLink: 'www.facebook.com'
  }];
  constructor() { }

  ngOnInit() {
  }

}
