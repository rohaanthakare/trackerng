import { Component, OnInit, Input, ViewChild, AfterViewInit, Injector } from '@angular/core';
import { MasterView } from 'src/app/models/master-view.model';
import { MasterViewService } from 'src/app/services/master-view.service';
import { Router } from '@angular/router';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';

@Component({
  selector: 'app-model-list',
  templateUrl: './model-list.component.html',
  styleUrls: ['./model-list.component.scss']
})
export class ModelListComponent implements OnInit, AfterViewInit {
  toolbarActions: MasterView[] = [];
  @Input() viewCode: string;
  @Input() data;
  @Input() columnDefs = [];
  @Input() viewTitle: string;
  @Input() displayedColumns = [];
  @Input() idColumn: string;
  @ViewChild(MatPaginator, {static : false}) paginator: MatPaginator;
  totalRecords: number;
  dataSource = new MatTableDataSource(this.data);
  selectedRowIndex = -1;
  selectedRow: any;
  constructor(private masterViewService: MasterViewService,
              private router: Router, private injector: Injector) { }

  ngOnInit() {
    this.masterViewService.getToolbarActions(this.viewCode).subscribe(
      (response: any) => {
        this.toolbarActions = response.data;
        this.toolbarActions.forEach((action: any) => {
          if (action.VIEW_TYPE === 'edit') {
            action.isDisabled = true;
          }
        });
      }
    );
  }
  ngAfterViewInit() {}

  toolbarButtonClicked(action) {
    if (action.VIEW_TYPE === 'edit') {
      this.router.navigate([action.VIEW_ROUTE + '/' + this.selectedRow[this.idColumn]]);
    } else {
      this.router.navigate([action.VIEW_ROUTE]);
    }
  }

  loadTableData() {
    // this.dataSource.data = data;
    // this.totalRecords = totalRecords;
  }

  rowSelected(row) {
    if (row) {
      this.selectedRowIndex = row[this.idColumn];
      this.selectedRow = row;
      this.toolbarActions.forEach((action: any) => {
        if (action.VIEW_TYPE === 'edit') {
          action.isDisabled = false;
        }
      });
    }
  }
}
