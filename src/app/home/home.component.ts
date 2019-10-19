import { Component, OnInit, ViewChild, ElementRef, AfterViewInit } from '@angular/core';
import { MenuService } from '../services/menu.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit, AfterViewInit {
  @ViewChild('sidenav', { static: false }) sidenav: ElementRef;
  constructor(private menuService: MenuService) { }

  ngOnInit() {
  }

  ngAfterViewInit() {
    this.menuService.sidenav = this.sidenav;
  }
}
