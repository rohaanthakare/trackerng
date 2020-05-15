import { Component, OnInit, Inject } from '@angular/core';
import { GroceryService } from '../grocery.service';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MessageService } from 'src/app/shared/services/message.service';

@Component({
  selector: 'app-my-grocery-list',
  templateUrl: './my-grocery-list.component.html',
  styleUrls: ['./my-grocery-list.component.scss']
})
export class MyGroceryListComponent implements OnInit {
  groceriesList = [];
  listType: any;
  selectedItems = [];
  constructor(private groceryService: GroceryService, public dialogRef: MatDialogRef<MyGroceryListComponent>,
              @Inject(MAT_DIALOG_DATA) public data: any, private notification: MessageService) { }

  ngOnInit() {
    this.listType = this.data.action;
    this.groceryService.getOutOfStockItems().subscribe(
      (response: any) => {
        this.groceriesList = response.groceries;
      }
    );
  }

  sendList() {
    this.groceryService.sendGroceryItemsList().subscribe(
      (response: any) => {
        this.notification.showSuccessMessage(response.message);
      }
    );
  }

  refillGrocery(selectedItems) {
    const itemIds = [];
    selectedItems.forEach((i) => {
      itemIds.push(i.value._id);
    });
    this.groceryService.refillGrocery(itemIds).subscribe(
      (response: any) => {
        this.notification.showSuccessMessage(response.message);
      }
    );
  }

}
