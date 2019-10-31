import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-outer-header',
  templateUrl: './outer-header.component.html',
  styleUrls: ['./outer-header.component.scss']
})
export class OuterHeaderComponent implements OnInit {

  constructor(private router: Router) { }

  ngOnInit() {
  }

  tabChanged(event) {
    console.log('Tab Changed - ');
    console.log(event);
    if (event.tab.textLabel === 'SIGN-IN') {
      this.router.navigate(['login']);
    }
  }

}
