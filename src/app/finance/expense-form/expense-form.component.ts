import { Component, OnInit, ViewChild } from '@angular/core';
import { ModelFormComponent } from 'src/app/core/model-form/model-form.component';
import { FormGroup, FormBuilder, FormControl } from '@angular/forms';
import { MasterDataService } from 'src/app/services/master-data.service';
import { ContactService } from 'src/app/contact/contact.service';
import { HelperService } from 'src/app/shared/services/helper.service';
import { FinanceService } from '../finance.service';

@Component({
  selector: 'app-expense-form',
  templateUrl: './expense-form.component.html',
  styleUrls: ['./expense-form.component.scss']
})
export class ExpenseFormComponent implements OnInit {
  @ViewChild(ModelFormComponent, {static: false}) modelForm: ModelFormComponent;
  formFields = [];
  expenseTypes = [];
  isExpenseTypesLoaded = false;
  expenseTypeCtrl = new FormControl();
  userContacts = [];
  isUserContactsLoaded = false;
  userContactControl = new FormControl();
  accounts = [];
  isAccountsLoaded = false;
  accountCtrl = new FormControl();
  amountCtrl = new FormControl();
  transactionDateCtrl = new FormControl();
  transactionDetailCtrl = new FormControl();
  expenseCategory = [];
  isExpenseCategoryLoaded = false;
  expenseCategoryCtrl = new FormControl();
  expenseForm: FormGroup = this.formBuilder.group({
    expenseType: this.expenseTypeCtrl,
    userContact: this.userContactControl,
    account: this.accountCtrl,
    transactionAmount: this.amountCtrl,
    transactionDate: this.transactionDateCtrl,
    transactionDetail: this.transactionDetailCtrl,
    transactionSubCategory: this.expenseCategoryCtrl
  });
  constructor(private formBuilder: FormBuilder, private masterDataService: MasterDataService, private contactService: ContactService,
              private helperService: HelperService, private financeService: FinanceService) { }

  ngOnInit() {
    this.masterDataService.getMasterDataForParent('EXPENSE_TYPE').subscribe(
      (response: any) => {
        this.expenseTypes = response.data;
        this.isExpenseTypesLoaded = true;
        this.allDataLoaded();
      }
    );

    this.masterDataService.getMasterDataForParent('EXPENSE_CATEGORY').subscribe(
      (response: any) => {
        this.expenseCategory = response.data;
        this.isExpenseCategoryLoaded = true;
        this.allDataLoaded();
      }
    );

    this.financeService.getFinancialAccounts().subscribe(
      (response: any) => {
        this.accounts = response.data;
        this.isAccountsLoaded = true;
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
    if (this.isExpenseTypesLoaded) {
      this.modelForm.setFieldConfigs(this.getFormFields());
    }
  }

  getFormFields() {
    this.formFields = [];
    this.formFields.push({
      label: 'Type',
      name: 'expenseType',
      type: 'select',
      dataScource: this.expenseTypes,
      valueField: '_id',
      displayField: 'configName',
      control: this.expenseTypeCtrl,
      controlName: 'expenseType'
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
      label: 'Account',
      name: 'account',
      type: 'select',
      dataScource: this.accounts,
      valueField: '_id',
      displayField: 'accountName',
      control: this.accountCtrl,
      controlName: 'account'
    });
    this.formFields.push({
      label: 'Amount',
      name: 'transactionAmount',
      type: 'number',
      control: this.amountCtrl,
      controlName: 'transactionAmount'
    });
    this.formFields.push({
      label: 'Category',
      name: 'transactionSubCategory',
      type: 'select',
      dataScource: this.expenseCategory,
      valueField: '_id',
      displayField: 'configName',
      control: this.expenseCategoryCtrl,
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
}
