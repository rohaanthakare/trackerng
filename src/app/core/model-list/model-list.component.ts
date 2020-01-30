import { Component, OnInit, Input, ViewChild, AfterViewInit, Injector, ViewEncapsulation, Output, EventEmitter } from '@angular/core';
import { MasterView } from 'src/app/models/master-view.model';
import { MasterViewService } from 'src/app/services/master-view.service';
import { Router } from '@angular/router';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { PasswordService } from 'src/app/password/services/password.service';
import { tap } from 'rxjs/operators';
import { ContactService } from 'src/app/contact/contact.service';
import { FinanceService } from 'src/app/finance/finance.service';
const modelServices = {
  Password: PasswordService,
  Contact: ContactService,
  Finance: FinanceService
};

@Component({
  selector: 'app-model-list',
  templateUrl: './model-list.component.html',
  styleUrls: ['./model-list.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class ModelListComponent implements OnInit, AfterViewInit {
  toolbarActions: MasterView[] = [];
  @Input() viewCode: string;
  @Input() columnDefs = [];
  @Input() viewTitle: string;
  @Input() displayedColumns = [];
  @Input() idColumn: string;
  @Input() moduleName: string;
  @Input() listDataServiceApi: string;
  @Output() customEvent: EventEmitter<any> = new EventEmitter();
  @Output() rowSelected: EventEmitter<any> = new EventEmitter();

  @ViewChild(MatPaginator, {static : false}) paginator: MatPaginator;
  totalRecords: number;
  dataSource = new MatTableDataSource([]);
  selectedRowIndex = -1;
  selectedRow: any;
  constructor(private masterViewService: MasterViewService,
              private router: Router, private injector: Injector) { }

  ngOnInit() {
    this.masterViewService.getToolbarActions(this.viewCode).subscribe(
      (response: any) => {
        this.toolbarActions = response.actions;
        this.toolbarActions.forEach((action: any) => {
          if (action.viewType !== 'create') {
            action.isDisabled = true;
          }
        });
      }
    );
  }
  ngAfterViewInit() {
    this.loadTableData();
    this.paginator.page.pipe(
      tap(() => this.loadTableData())
    ).subscribe();
  }

  toolbarButtonClicked(action: MasterView) {
    if (action.viewType === 'edit') {
      this.router.navigate([action.viewRoute + '/' + this.selectedRow[this.idColumn]]);
    } else if (action.viewType === 'delete') {
      this.customEvent.emit({
        action: action.viewRoute,
        selectedId: this.selectedRow[this.idColumn]
      });
    } else {
      this.router.navigate([action.viewRoute]);
    }
  }

  loadTableData() {
    const serviceObj = this.injector.get<any>(modelServices[this.moduleName]);
    const start = this.paginator.pageIndex * this.paginator.pageSize;
    serviceObj[this.listDataServiceApi]('', start, this.paginator.pageSize).subscribe(
      (response: any) => {
        this.dataSource.data = response.data;
        this.totalRecords = response.count;
      },
      error => {

      }
    );
  }

  onRowSelect(row) {
    if (row) {
      if (!this.idColumn) {
        this.idColumn = '_id';
      }
      const eventParams = {
        selectedRow: row,
        toolbarButtons: this.toolbarActions
      };
      this.rowSelected.emit(eventParams);
      this.selectedRowIndex = row[this.idColumn];
      this.selectedRow = row;
      this.toolbarActions.forEach((action: any) => {
        if (action.viewType === 'edit') {
          action.isDisabled = false;
        }
      });
    }
  }

  isMaterialIcon(action: MasterView) {
    if (action.iconClass.includes('fas')) {
      return false;
    }
    return true;
  }
}
