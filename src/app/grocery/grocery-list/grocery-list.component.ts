import { Component, OnInit, ViewChild } from '@angular/core';
import { GroceryService } from '../grocery.service';
import { ModelListComponent } from 'src/app/core/model-list/model-list.component';
import { HelperService } from 'src/app/shared/services/helper.service';
import { MatDialog } from '@angular/material/dialog';
import { MyGroceryListComponent } from '../my-grocery-list/my-grocery-list.component';
import { MessageService } from 'src/app/shared/services/message.service';

@Component({
  selector: 'app-grocery-list',
  templateUrl: './grocery-list.component.html',
  styleUrls: ['./grocery-list.component.scss']
})
export class GroceryListComponent implements OnInit {
  @ViewChild(ModelListComponent, {static: true}) listGrid: ModelListComponent;
  displayedColumns: string[] = ['name', 'category', 'status'];
  buttons = [];
  selectedItemIds = [];
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

  constructor(private groceryService: GroceryService, private helperService: HelperService, private notification: MessageService,
              private dialog: MatDialog) { }

  ngOnInit() {
    this.getAllGroceryItems();
  }

  getAllGroceryItems() {
    this.groceryService.getGroceryItems().subscribe(
      (response: any) => {
        this.listGrid.setTableData(response.groceries);
      }
    );
  }

  customEventHandler(event) {
    switch (event.action) {
      case 'GROCERY_REMOVE_FROM_STOCK': {
        this.groceryService.consumeGrocery(this.selectedItemIds).subscribe(
          (response: any) => {
            this.getAllGroceryItems();
            this.selectedItemIds = [];
            this.notification.showSuccessMessage(response.message);
          }
        );
        break;
      }

      case 'GROCERY_ADD_TO_STOCK': {
        this.groceryService.refillGrocery(this.selectedItemIds).subscribe(
          (response: any) => {
            this.getAllGroceryItems();
            this.selectedItemIds = [];
            this.notification.showSuccessMessage(response.message);
          }
        );
        break;
      }

      case 'GROCERY_GET_MY_LIST': {
        const dialogRef = this.dialog.open(MyGroceryListComponent, {
          width: '350px'
        });
        break;
      }
    }
  }

  onSelectionChanged(selectedRows) {
    if (selectedRows.length > 0) {
      this.selectedItemIds = [];
      selectedRows.forEach((d) => {
        this.selectedItemIds.push(d._id);
      });
      this.buttons.forEach((b) => {
        if (b.viewCode === 'GROCERY_ADD_TO_STOCK' || b.viewCode === 'GROCERY_REMOVE_FROM_STOCK') {
          b.isDisabled = false;
        }
      });
    } else {
      this.buttons.forEach((b) => {
        if (b.viewCode === 'GROCERY_ADD_TO_STOCK' || b.viewCode === 'GROCERY_REMOVE_FROM_STOCK') {
          b.isDisabled = true;
        }
      });
    }
  }

  onToolbarButtonsAdded(buttons) {
    this.buttons = buttons;
    buttons.forEach((b) => {
      if (b.viewCode === 'GROCERY_GET_MY_LIST' || b.viewCode === 'GROCERY_SHARE_LIST') {
        b.isDisabled = false;
      }
    });
  }
}
