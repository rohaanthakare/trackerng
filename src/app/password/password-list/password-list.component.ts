import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { Password } from '../models/password.model';
import { MasterViewService } from 'src/app/services/master-view.service';
import { MasterView } from 'src/app/models/master-view.model';
import { Router } from '@angular/router';

@Component({
  selector: 'app-password-list',
  templateUrl: './password-list.component.html',
  styleUrls: ['./password-list.component.scss']
})
export class PasswordListComponent implements OnInit {
  viewCode = 'PASSWORD_LIST';
  toolbarActions: MasterView[] = [];
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
  constructor(private router: Router, private masterViewService: MasterViewService) { }

  ngOnInit() {
    this.masterViewService.getToolbarActions(this.viewCode).subscribe(
      response => {
        this.toolbarActions = response.data;
      },
      error => {
        console.log(error);
      }
    );
    this.passwords.paginator = this.paginator;
  }

  toolbarButtonClicked(action) {
    this.router.navigate([action.VIEW_ROUTE]);
  }
}
