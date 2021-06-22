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
import { CurrencyPipe } from '@angular/common';
import { SelectionModel } from '@angular/cdk/collections';
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
  @Input() noPagination: boolean;
  @Input() grouping: boolean;
  @Input() multiSelect: boolean;
  @Input() groupField: any;
  @Input() groupHeader: any;
  @Input() groupSubheader: any;
  @Input() hasFooterRow: boolean;
  @Output() customEvent: EventEmitter<any> = new EventEmitter();
  @Output() rowSelected: EventEmitter<any> = new EventEmitter();
  @Output() selectionChanged: EventEmitter<any> = new EventEmitter();
  @Output() dataLoaded: EventEmitter<any> = new EventEmitter();
  @Output() toolbarButtonsAdded: EventEmitter<any> = new EventEmitter();
  @ViewChild(MatPaginator, {static : false}) paginator: MatPaginator;
  totalRecords: number;
  dataSource = new MatTableDataSource([]);
  selection = new SelectionModel(true, []);
  selectedRowIndex = -1;
  selectedRow: any;
  constructor(private masterViewService: MasterViewService, private cp: CurrencyPipe,
              private router: Router, private injector: Injector) { }

  ngOnInit() {
    // If we have checkbox selection in Table
    if (this.multiSelect) {
      this.selection.changed.subscribe(
        response => {
          this.selectionChanged.emit(response.source.selected);
        }
      );
      this.displayedColumns.unshift('select');
      this.columnDefs.unshift({
        headerSelect: true,
        checkbox: true,
        id: 'select',
        name: 'select'
      });
    }

    if (this.viewCode) {
      this.masterViewService.getToolbarActions(this.viewCode).subscribe(
        (response: any) => {
          this.toolbarActions = response.actions;
          this.toolbarActions.forEach((action: any) => {
            if (action.viewType !== 'create') {
              action.isDisabled = true;
            }
          });
          this.toolbarButtonsAdded.emit(this.toolbarActions);
        }
      );
    }
  }

  isAllSelected() {
    const numSelected = this.selection.selected.length;
    const numRows = this.dataSource.data.length;
    return numSelected === numRows;
  }

  masterToggle() {
    this.isAllSelected() ?
        this.selection.clear() :
        this.dataSource.data.forEach(row => this.selection.select(row));
  }

  ngAfterViewInit() {
    if (this.listDataServiceApi) {
      this.loadTableData();
    }
    if (!this.noPagination) {
      this.paginator.page.pipe(
        tap(() => this.loadTableData())
      ).subscribe();
    }
  }

  toolbarButtonClicked(action: MasterView) {
    if (action.viewType === 'edit') {
      this.router.navigate([action.viewRoute + '/' + this.selectedRow[this.idColumn]]);
    } else if (action.viewType === 'delete') {
      this.customEvent.emit({
        action: action.viewRoute,
        selectedId: this.selectedRow[this.idColumn]
      });
    } else if (action.viewType === 'custom') {
      this.customEvent.emit({
        action: action.viewCode,
        selectedRecord: this.selectedRow
      });
    } else {
      this.router.navigate([action.viewRoute]);
    }
  }

  loadTableData() {
    const serviceObj = this.injector.get<any>(modelServices[this.moduleName]);
    const start = (!this.noPagination) ? this.paginator.pageIndex * this.paginator.pageSize : undefined;
    const pageSize = (!this.noPagination) ? this.paginator.pageSize : undefined;
    if (serviceObj[this.listDataServiceApi]) {
      serviceObj[this.listDataServiceApi]('', start, pageSize).subscribe(
        (response: any) => {
          this.dataSource.data = response.data;
          this.totalRecords = response.count;
        }
      );
    }
  }

  setTableData(data, count?) {
    this.dataSource.data = data;
    this.totalRecords = count;
    this.selection.clear();
    this.dataLoaded.emit();
  }

  prepareGroupedData(inputData) {

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

  getAggregateData(operationType, column) {
    if (operationType === 'SUM') {
      const total = this.dataSource.data.map(t => t[column.name]).reduce((acc, value) => acc + value, 0);
      return this.cp.transform(total, 'INR');
    }
  }
}
