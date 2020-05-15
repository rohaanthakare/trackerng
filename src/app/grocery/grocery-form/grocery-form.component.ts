import { Component, OnInit, ViewChild } from '@angular/core';
import { FormGroup, FormBuilder, FormControl, Validators } from '@angular/forms';
import { MasterDataService } from 'src/app/services/master-data.service';
import { ModelFormComponent } from 'src/app/core/model-form/model-form.component';
import { GroceryService } from '../grocery.service';
import { MessageService } from 'src/app/shared/services/message.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-grocery-form',
  templateUrl: './grocery-form.component.html',
  styleUrls: ['./grocery-form.component.scss']
})
export class GroceryFormComponent implements OnInit {
  @ViewChild(ModelFormComponent, {static: false}) modelForm: ModelFormComponent;
  itemId: any;
  actionType: string;
  itemDetails: any;
  formFields = [];
  nameCtrl = new FormControl('', [Validators.required]);
  categories = [];
  isCategoryLoaded = false;
  categoryCtrl = new FormControl('');
  isOutOfStockCtrl = new FormControl(false);
  groceryItemForm: FormGroup = this.formBuilder.group({
    name: this.nameCtrl,
    category: this. categoryCtrl,
    isOutOfStock: this.isOutOfStockCtrl
  });
  constructor(private formBuilder: FormBuilder, private masterDataService: MasterDataService, private groceryService: GroceryService,
              private notification: MessageService, private route: ActivatedRoute) { }

  ngOnInit() {
    this.route.paramMap.subscribe(
      params => {
        this.itemId = params.get('id');
        if (this.itemId) {
          this.actionType = 'edit';
          this.getItemDetails();
        }
      }
    );

    this.masterDataService.getMasterDataForParent('GROCERY_CATEGORY').subscribe(
      (response: any) => {
        this.categories = response.data;
        this.isCategoryLoaded = true;
        this.preReqDataLoaded();
      }
    );
  }

  getItemDetails() {
    this.groceryService.getGroceryItemDetails(this.itemId).subscribe(
      (response: any) => {
        this.itemDetails = response.item;
      }
    );
  }

  preReqDataLoaded() {
    if (this.isCategoryLoaded) {
      this.setFormFields();
    }
  }

  setFormFields() {
    this.formFields = [];
    this.formFields.push({
      label: 'Name',
      name: 'name',
      type: 'text',
      control: this.nameCtrl,
      controlName: 'name'
    });

    this.formFields.push({
      label: 'Category',
      name: 'category',
      type: 'select',
      dataScource: this.categories,
      valueField: '_id',
      displayField: 'configName',
      control: this.categoryCtrl,
      controlName: 'category'
    });

    this.formFields.push({
      label: 'Out of Stock?',
      name: 'isOutOfStock',
      type: 'slide-toggle',
      control: this.isOutOfStockCtrl,
      controlName: 'isOutOfStock'
    });

    this.modelForm.setFieldConfigs(this.formFields);
    this.modelForm.setValues(this.itemDetails);
  }

  createItem() {
    if (this.groceryItemForm.valid) {
      if (this.itemId) {
        this.groceryService.updateGroceryItem(this.itemId, this.groceryItemForm.value).subscribe(
          (response: any) => {
            this.notification.showSuccessMessage(response.message);
          }
        );
      } else {
        this.groceryService.createGroceryItem(this.groceryItemForm.value).subscribe(
          (response: any) => {
            this.notification.showSuccessMessage(response.message);
            this.groceryItemForm.reset();
          }
        );
      }
    } else {
      this.notification.showErrorMessage('Form contains error, please correct those');
    }
  }

}
