import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { Password } from '../models/password.model';
import { MasterViewService } from 'src/app/services/master-view.service';
import { MasterView } from 'src/app/models/master-view.model';
import { Router } from '@angular/router';
import { PasswordService } from '../services/password.service';
import { ModelListComponent } from 'src/app/core/model-list/model-list.component';

@Component({
  selector: 'app-password-list',
  templateUrl: './password-list.component.html',
  styleUrls: ['./password-list.component.scss']
})
export class PasswordListComponent implements OnInit {
  viewCode = 'PASSWORD_LIST';
  viewTitle = 'Passwords';
  // @ViewChild(MatPaginator, {static: false}) paginator: MatPaginator;
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
  constructor(private router: Router,
              private masterViewService: MasterViewService,
              private passwordService: PasswordService) { }

  ngOnInit() {
    this.getPasswords();
    // this.masterViewService.getToolbarActions(this.viewCode).subscribe(
    //   response => {
    //     this.toolbarActions = response.data;
    //     this.getPasswords();
    //   },
    //   error => {
    //     console.log(error);
    //   }
    // );
    // this.passwords.paginator = this.paginator;
  }

  getPasswords() {
    this.passwordService.getAllPasswords().subscribe(
      (response: any) => {
        console.log('All Passwords');
        console.log(response);
        // this.length = response.data.length;
        this.data = response.data;
        this.modelList.loadTableData(this.data, this.data.length);
      },
      error => {
        console.log('All Passwords Error');
        console.log(error);
      }
    );
  }

  toolbarButtonClicked(action) {
    this.router.navigate([action.VIEW_ROUTE]);
  }
}
