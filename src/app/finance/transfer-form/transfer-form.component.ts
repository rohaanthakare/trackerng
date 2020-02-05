import { Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, FormControl } from '@angular/forms';
import { MasterDataService } from 'src/app/services/master-data.service';
import { ModelFormComponent } from 'src/app/core/model-form/model-form.component';
import { FinanceService } from '../finance.service';
import { ContactService } from 'src/app/contact/contact.service';

@Component({
  selector: 'app-transfer-form',
  templateUrl: './transfer-form.component.html',
  styleUrls: ['./transfer-form.component.scss']
})
export class TransferFormComponent implements OnInit {
  @ViewChild(ModelFormComponent, {static: false}) modelForm: ModelFormComponent;
  transfterSubCategories = [];
  isTransfterSubCategoriesLoaded = false;
  transferSubCategoryCtrl = new FormControl();
  transferTypes = [];
  isTransfterTypesLoaded = false;
  transferTypeCtrl = new FormControl();
  fromAccounts = [];
  isFromAccountLoaded = false;
  fromAccountCtrl = new FormControl();
  toAccounts = [];
  isToAccountsLoaded = false;
  toAccountCtrl = new FormControl();
  transactionDateCtrl = new FormControl();
  transactionDetailCtrl = new FormControl();
  userContacts = [];
  isUserContactsLoaded = false;
  userContactControl = new FormControl();
  amountCtrl = new FormControl();
  transferForm: FormGroup = this.formBuilder.group({
    transactionSubCategory: this.transferSubCategoryCtrl,
    fromAccount: this.fromAccountCtrl,
    toAccount: this.toAccountCtrl,
    transactionAmount: this.amountCtrl,
    transferType: this.transferTypeCtrl,
    transactionDate: this.transactionDateCtrl,
    transactionDetail: this.transactionDetailCtrl,
    userContact: this.userContactControl
  });
  constructor(private formBuilder: FormBuilder, private masterDataService: MasterDataService, private contactService: ContactService,
              private financeService: FinanceService) { }

  ngOnInit() {
    this.masterDataService.getMasterDataForParent('TRANSFER_TYPE').subscribe(
      (response: any) => {
        this.transferTypes = response.data;
        this.isTransfterTypesLoaded = true;
        this.allDataLoaded();
      }
    );

    this.masterDataService.getMasterDataForParent('TRANSFER_CATEGORY').subscribe(
      (response: any) => {
        this.transfterSubCategories = response.data;
        this.isTransfterSubCategoriesLoaded = true;
        this.allDataLoaded();
      }
    );

    this.financeService.getFinancialAccounts().subscribe(
      (response: any) => {
        this.fromAccounts = response.data;
        this.toAccounts = response.data;
        this.isToAccountsLoaded = true;
        this.isFromAccountLoaded = true;
        this.allDataLoaded();
      }
    );

    this.contactService.getUserContacts().subscribe(
      (response: any) => {
        this.userContacts = response.data;
        this.isUserContactsLoaded = true;
        this.allDataLoaded();
      }
    );
  }

  allDataLoaded() {
    if (this.isTransfterTypesLoaded && this.isTransfterSubCategoriesLoaded && this.isFromAccountLoaded
      && this.isUserContactsLoaded) {
      this.modelForm.setFieldConfigs(this.getFieldConfigs());
    }
  }

  getFieldConfigs() {
    return [{
      label: 'Type',
      name: 'transferType',
      type: 'select',
      dataScource: this.transferTypes,
      valueField: '_id',
      displayField: 'configName',
      control: this.transferTypeCtrl,
      controlName: 'transferType'
    }, {
      label: 'From Account',
      name: 'fromAccount',
      type: 'select',
      dataScource: this.fromAccounts,
      valueField: '_id',
      displayField: 'accountName',
      control: this.fromAccountCtrl,
      controlName: 'fromAccount'
    }, {
      label: 'To Account',
      name: 'toAccount',
      type: 'select',
      dataScource: this.toAccounts,
      valueField: '_id',
      displayField: 'accountName',
      control: this.toAccountCtrl,
      controlName: 'toAccount'
    }, {
      label: 'Amount',
      name: 'transactionAmount',
      type: 'number',
      control: this.amountCtrl,
      controlName: 'transactionAmount'
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
      dataScource: this.transfterSubCategories,
      valueField: '_id',
      displayField: 'configName',
      control: this.transferSubCategoryCtrl,
      controlName: 'transactionSubCategory'
    }, {
      label: 'Detail',
      name: 'transactionDetail',
      type: 'text',
      control: this.transactionDetailCtrl,
      controlName: 'transactionDetail'
    }];
  }

  transferMoney() {
    if (this.transferForm.valid) {
      this.financeService.transferMoney(this.transferForm.value).subscribe(
        response => {
          console.log('Success');
        }
      );
    }
  }
}
