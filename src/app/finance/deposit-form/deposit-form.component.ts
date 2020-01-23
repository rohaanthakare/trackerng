import { Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, FormControl } from '@angular/forms';
import { MasterDataService } from 'src/app/services/master-data.service';
import { ModelFormComponent } from 'src/app/core/model-form/model-form.component';

@Component({
  selector: 'app-deposit-form',
  templateUrl: './deposit-form.component.html',
  styleUrls: ['./deposit-form.component.scss']
})
export class DepositFormComponent implements OnInit {
  @ViewChild(ModelFormComponent, {static: false}) modelForm: ModelFormComponent;
  depositTypes = [];
  isDepositTypeLoaded = false;
  accounts = [];
  isAccountsLoaded = false;
  transactionSubCategories = [];
  isTransactionSubCategoriesLoaded = false;
  depositTypeCtrl = new FormControl();
  accountCtrl = new FormControl();
  amountCtrl = new FormControl();
  depositSubCategoryCtrl = new FormControl();
  transactionDateCtrl = new FormControl();
  transactionDetailCtrl = new FormControl();
  depositForm: FormGroup = this.formBuilder.group({
    transactionSubCategory: this.depositSubCategoryCtrl,
    account: this.accountCtrl,
    amount: this.amountCtrl,
    depositType: this.depositTypeCtrl,
    transactionDate: this.transactionDateCtrl,
    transactionDetail: this.transactionDetailCtrl
  });
  constructor(private formBuilder: FormBuilder, private masterDataService: MasterDataService) { }

  ngOnInit() {
    this.masterDataService.getMasterDataForParent('DEPOSIT_TYPE').subscribe(
      (response: any) => {
        this.depositTypes = response.data;
        this.isDepositTypeLoaded = true;
        this.allDataLoaded();
      }
    );

    this.masterDataService.getMasterDataForParent('DEPOSIT_CATEGORY').subscribe(
      (response: any) => {
        this.transactionSubCategories = response.data;
        this.isTransactionSubCategoriesLoaded = true;
        this.allDataLoaded();
      }
    );
  }

  allDataLoaded() {
    if (this.isDepositTypeLoaded && this.isTransactionSubCategoriesLoaded) {
      this.modelForm.setFieldConfigs(this.getFieldConfigs());
    }
  }

  getFieldConfigs() {
    return [{
      label: 'Type',
      name: 'depositType',
      type: 'select',
      dataScource: this.depositTypes,
      valueField: '_id',
      displayField: 'configName',
      control: this.depositTypeCtrl,
      controlName: 'depositType'
    }, {
      label: 'Amount',
      name: 'amount',
      type: 'number',
      control: this.amountCtrl,
      controlName: 'amount'
    }, {
      label: 'Date',
      name: 'transactionDate',
      type: 'date',
      control: this.transactionDateCtrl,
      controlName: 'transactionDate'
    }, {
      label: 'Category',
      name: 'transactionSubCategory',
      type: 'select',
      dataScource: this.transactionSubCategories,
      valueField: '_id',
      displayField: 'configName',
      control: this.depositSubCategoryCtrl,
      controlName: 'transactionSubCategory'
    }];
  }

}
