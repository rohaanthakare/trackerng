import { Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, FormControl } from '@angular/forms';
import { MasterDataService } from 'src/app/services/master-data.service';
import { ModelFormComponent } from 'src/app/core/model-form/model-form.component';
import { FinanceService } from '../finance.service';
import { ContactService } from 'src/app/contact/contact.service';
import { HelperService } from 'src/app/shared/services/helper.service';
import { MessageService } from 'src/app/shared/services/message.service';

@Component({
  selector: 'app-transfer-form',
  templateUrl: './transfer-form.component.html',
  styleUrls: ['./transfer-form.component.scss']
})
export class TransferFormComponent implements OnInit {
  @ViewChild(ModelFormComponent, {static: false}) modelForm: ModelFormComponent;
  formFields = [];
  isOwnTransaction = false;
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
  }, {
    validators: [this.helperService.transAmountValidator('transactionAmount', 'fromAccount'),
      this.helperService.transAccountValidator('fromAccount', 'toAccount')]
  });
  constructor(private formBuilder: FormBuilder, private masterDataService: MasterDataService, private contactService: ContactService,
              private financeService: FinanceService, private helperService: HelperService, private msgService: MessageService) { }

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
    this.formFields = [];
    this.formFields.push({
      label: 'Type',
      name: 'transferType',
      type: 'select',
      dataScource: this.transferTypes,
      valueField: '_id',
      displayField: 'configName',
      control: this.transferTypeCtrl,
      onDataSelected: (data) => {
        if (data.configCode === 'OWN_TRANSFER') {
          this.isOwnTransaction = true;
        } else {
          this.isOwnTransaction = false;
        }
        this.updateFields();
      },
      controlName: 'transferType'
    });

    this.formFields.push({
      label: 'User',
      name: 'userContact',
      type: 'select',
      dataScource: this.userContacts,
      valueField: '_id',
      displayField: 'firstName',
      control: this.userContactControl,
      renderer: (data) => {
        if (data) {
          const firstName = this.helperService.convertToTitleCase(data.firstName);
          const lastName = this.helperService.convertToTitleCase(data.lastName);
          return firstName + ' ' + lastName;
        }
      },
      controlName: 'userContact'
    });

    this.formFields.push({
      label: 'From Account',
      name: 'fromAccount',
      type: 'select',
      dataScource: this.fromAccounts,
      valueField: '_id',
      displayField: 'accountName',
      control: this.fromAccountCtrl,
      controlName: 'fromAccount'
    });
    this.formFields.push({
      label: 'To Account',
      name: 'toAccount',
      type: 'select',
      dataScource: this.toAccounts,
      valueField: '_id',
      displayField: 'accountName',
      control: this.toAccountCtrl,
      controlName: 'toAccount',
      errors: {
        name: 'sameAccount',
        message: 'From account and to account should not be same'
      }
    });
    this.formFields.push({
      label: 'Amount',
      name: 'transactionAmount',
      type: 'number',
      control: this.amountCtrl,
      controlName: 'transactionAmount',
      errors: {
        name: 'insufficientFunds',
        message: 'Insufficient funds in account, please select other account'
      }
    });
    this.formFields.push({
      label: 'Date',
      name: 'transactionDate',
      type: 'date',
      control: this.transactionDateCtrl,
      controlName: 'transactionDate'
    });
    this.formFields.push({
      label: 'Category',
      name: 'transactionSubCategory',
      type: 'select',
      dataScource: this.transfterSubCategories,
      valueField: '_id',
      displayField: 'configName',
      control: this.transferSubCategoryCtrl,
      controlName: 'transactionSubCategory'
    });
    this.formFields.push({
      label: 'Detail',
      name: 'transactionDetail',
      type: 'text',
      control: this.transactionDetailCtrl,
      controlName: 'transactionDetail'
    });
    return this.formFields;
  }

  updateFields() {
    if (this.isOwnTransaction) {
      this.modelForm.removeField('userContact');
    } else {
      this.modelForm.addField('userContact');
    }
  }

  transferMoney() {
    if (this.transferForm.valid) {
      this.financeService.transferMoney(this.transferForm.value).subscribe(
        (response: any) => {
          this.msgService.showSuccessMessage(response.message, 'center', 'top');
          this.transferForm.reset();
        },
        error => {
          const errorMsg = error.error ? error.error.message : error.statusText;
          this.msgService.showErrorMessage(errorMsg, 'center', 'top');
        }
      );
    } else {
      this.msgService.showErrorMessage('Form contains error, please remove errors to transfer money', 'center', 'top');
    }
  }
}
