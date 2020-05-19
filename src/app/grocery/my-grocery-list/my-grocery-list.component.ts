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
  constructor(private groceryService: GroceryService, public dialogRef: MatDialogRef<MyGroceryListComponent>,
              private notification: MessageService) { }

  ngOnInit() {
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
}
