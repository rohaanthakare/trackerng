import { Component, OnInit, Input } from '@angular/core';
import { MasterView } from 'src/app/models/master-view.model';
import { MasterViewService } from 'src/app/services/master-view.service';
import { Router } from '@angular/router';
import { MatTableDataSource } from '@angular/material/table';

@Component({
  selector: 'app-model-list',
  templateUrl: './model-list.component.html',
  styleUrls: ['./model-list.component.scss']
})
export class ModelListComponent implements OnInit {
  toolbarActions: MasterView[] = [];
  @Input() viewCode: string;
  @Input() data;
  @Input() columnDefs = [];
  @Input() viewTitle: string;
  @Input() displayedColumns = [];
  totalRecords: number;
  dataSource = new MatTableDataSource(this.data);
  constructor(private masterViewService: MasterViewService,
              private router: Router) { }

  ngOnInit() {
    this.masterViewService.getToolbarActions(this.viewCode).subscribe(
      (response: any) => {
        this.toolbarActions = response.data;
      }
    );
  }

  toolbarButtonClicked(action) {
    this.router.navigate([action.VIEW_ROUTE]);
  }

  loadTableData(data, totalRecords) {
    this.dataSource.data = data;
    this.totalRecords = totalRecords;
  }
}
