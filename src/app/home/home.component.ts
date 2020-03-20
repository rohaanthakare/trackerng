import { Component, OnInit, ViewChild, ElementRef, AfterViewInit } from '@angular/core';
import { MenuService } from '../services/menu.service';
import { Title } from '@angular/platform-browser';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit, AfterViewInit {
  @ViewChild('sidenav', { static: false }) sidenav: ElementRef;
  constructor(private menuService: MenuService, private titleService: Title) { }

  ngOnInit() {
    this.titleService.setTitle('Trakcer');
  }

  ngAfterViewInit() {
    this.menuService.sidenav = this.sidenav;
  }
}
