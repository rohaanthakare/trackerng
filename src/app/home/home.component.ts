import { Component, OnInit, ViewChild, ElementRef, AfterViewInit } from '@angular/core';
import { MenuService } from '../services/menu.service';
import { Title } from '@angular/platform-browser';
import { Router } from '@angular/router';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit, AfterViewInit {
  @ViewChild('sidenav', { static: false }) sidenav: ElementRef;
  constructor(private menuService: MenuService, private titleService: Title, private router: Router) { }

  ngOnInit() {
    this.titleService.setTitle('Tracker');
  }

  ngAfterViewInit() {
    this.menuService.sidenav = this.sidenav;
  }
}
