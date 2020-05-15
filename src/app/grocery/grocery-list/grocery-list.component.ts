import { Component, OnInit, ViewChild } from '@angular/core';
import { GroceryService } from '../grocery.service';
import { ModelListComponent } from 'src/app/core/model-list/model-list.component';
import { HelperService } from 'src/app/shared/services/helper.service';
import { MatDialog } from '@angular/material/dialog';
import { MyGroceryListComponent } from '../my-grocery-list/my-grocery-list.component';

@Component({
  selector: 'app-grocery-list',
  templateUrl: './grocery-list.component.html',
  styleUrls: ['./grocery-list.component.scss']
})
export class GroceryListComponent implements OnInit {
  @ViewChild(ModelListComponent, {static: true}) listGrid: ModelListComponent;
  displayedColumns: string[] = ['name', 'category', 'status'];
  columnDefs = [{
    name: 'name',
    header: 'Name',
    field: 'name',
    renderer: (row) => {
      return this.helperService.convertToTitleCase(row.name);
    }
  }, {
    name: 'category',
    header: 'Category',
    field: 'category',
    renderer: (row) => {
      return row.category.configName;
    }
  }, {
    name: 'status',
    header: 'Status',
    field: 'status',
    renderer: (row) => {
      if (row.isOutOfStock) {
        return `<label class='error-text'>Out of Stock</label>`;
      } else {
        return `<label class='success-text'>In Stock</label>`;
      }
    }
  }];

  constructor(private groceryService: GroceryService, private helperService: HelperService,
              private dialog: MatDialog) { }

  ngOnInit() {
    this.getAllGroceryItems();
  }

  getAllGroceryItems() {
    this.groceryService.getGroceryItems().subscribe(
      (response: any) => {
        console.log(response);
        this.listGrid.setTableData(response.groceries);
      }
    );
  }

  customEventHandler(event) {
    const dialogRef = this.dialog.open(MyGroceryListComponent, {
      width: '350px',
      data: {
        action: event.action
      }
    });

    dialogRef.afterClosed().subscribe(result => {
      this.getAllGroceryItems();
    });
  }

}
