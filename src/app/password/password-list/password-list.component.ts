import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { Password } from '../models/password.model';
import { MasterViewService } from 'src/app/services/master-view.service';
import { MasterView } from 'src/app/models/master-view.model';
import { Router } from '@angular/router';
import { ModelListComponent } from 'src/app/core/model-list/model-list.component';

@Component({
  selector: 'app-password-list',
  templateUrl: './password-list.component.html',
  styleUrls: ['./password-list.component.scss']
})
export class PasswordListComponent implements OnInit {
  viewCode = 'PASSWORD_LIST';
  viewTitle = 'Passwords';
  idColumn = 'SYS_PASSWORD_ID';
  @ViewChild(ModelListComponent, {static: false}) modelList: ModelListComponent;
  displayedColumns: string[] = ['name', 'username'];
  columnDefs = [{
    name: 'name',
    header: 'Name',
    field: 'NAME'
  }, {
    name: 'username',
    header: 'Username',
    field: 'USERNAME'
  }];
  data = [];
  constructor(private router: Router) { }

  ngOnInit() { }

  toolbarButtonClicked(action) {
    this.router.navigate([action.VIEW_ROUTE]);
  }
}
