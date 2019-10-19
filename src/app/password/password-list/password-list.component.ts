import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { Password } from '../models/password.model';

@Component({
  selector: 'app-password-list',
  templateUrl: './password-list.component.html',
  styleUrls: ['./password-list.component.scss']
})
export class PasswordListComponent implements OnInit {
  length = 2;
  @ViewChild(MatPaginator, {static: false}) paginator: MatPaginator;
  displayedColumns: string[] = ['name', 'siteLink'];
  passwords = new MatTableDataSource<Password>([{
    id: 1,
    username: 'rohaanthakare',
    password: 'asdvfmdlmfvkdfld',
    name: 'Gmail',
    siteLink: 'www.gmail.com'
  }, {
    id: 2,
    username: 'rohaanthakare',
    password: 'asdvfmdlmfvkdfld',
    name: 'Facebook',
    siteLink: 'www.facebook.com'
  }]);
  constructor() { }

  ngOnInit() {
    this.passwords.paginator = this.paginator;
  }

}
