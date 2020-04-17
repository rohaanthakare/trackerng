import { Component, OnInit, ViewChild } from '@angular/core';
import { ModelFormComponent } from 'src/app/core/model-form/model-form.component';
import { FormGroup, FormBuilder, FormControl, Validators } from '@angular/forms';
import { MasterDataService } from 'src/app/services/master-data.service';
import { ContactService } from 'src/app/contact/contact.service';
import { HelperService } from 'src/app/shared/services/helper.service';
import { FinanceService } from '../finance.service';
import { MessageService } from 'src/app/shared/services/message.service';
import { CurrencyPipe } from '@angular/common';

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
  userContactsControl = new FormControl();
  isOtherUserExpense = false;
  isMultiUserExpense = false;
  accounts = [];
  isAccountsLoaded = false;
  accountCtrl = new FormControl();
  amountCtrl = new FormControl('', [Validators.required]);
  transactionDateCtrl = new FormControl('', [Validators.required]);
  transactionDetailCtrl = new FormControl('', [Validators.required]);
  accountBalanceCtrl = new FormControl();
  expenseCategory = [];
  isExpenseCategoryLoaded = false;
  expenseCategoryCtrl = new FormControl();
  usersSelected: any;
  expenseForm: FormGroup = this.formBuilder.group({
    expenseType: this.expenseTypeCtrl,
    userContact: this.userContactControl,
    userContacts: this.userContactsControl,
    account: this.accountCtrl,
    transactionAmount: this.amountCtrl,
    transactionDate: this.transactionDateCtrl,
    transactionDetail: this.transactionDetailCtrl,
    transactionSubCategory: this.expenseCategoryCtrl,
    accountBalance: this.accountBalanceCtrl
  }, {
    validators: [this.helperService.transAmountValidator('transactionAmount', 'account')]
  });
  constructor(private formBuilder: FormBuilder, private masterDataService: MasterDataService, private contactService: ContactService,
              private helperService: HelperService, private financeService: FinanceService, private msgService: MessageService,
              private cp: CurrencyPipe) { }

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
      this.updateFormFields();
    }
  }

  updateFormFields() {
    if (!this.isOtherUserExpense && !this.isMultiUserExpense) {
      this.modelForm.removeField('userContact');
      this.modelForm.removeField('userContacts');
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
      controlName: 'expenseType',
      onDataSelected: (data) => {
        if (data.configCode === 'OTHER_USER_EXPENSE') {
          this.isMultiUserExpense = false;
          this.isOtherUserExpense = true;
          this.modelForm.addField('userContact');
          this.modelForm.removeField('userContacts');
          const newData = this.userContacts.filter((c) => !(c.isSelfUser));
          this.modelForm.updateSelectFieldDataScource('userContact', newData);
        } else if (data.configCode === 'MULTI_USER_EXPENSE') {
          this.isMultiUserExpense = true;
          this.isOtherUserExpense = false;
          const meContact = this.contactService.getMeContact();
          const newData = this.userContacts;
          newData.push(meContact);
          this.modelForm.removeField('userContact');
          this.modelForm.addField('userContacts');
          this.modelForm.updateSelectFieldDataScource('userContacts', newData);
        } else {
          this.isMultiUserExpense = false;
          this.isOtherUserExpense = false;
          this.modelForm.removeField('userContact');
          this.modelForm.removeField('userContacts');
        }
      }
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
      label: 'Users',
      name: 'userContacts',
      type: 'select-list',
      dataScource: this.userContacts,
      valueField: '_id',
      displayField: 'firstName',
      control: this.userContactsControl,
      renderer: (data) => {
        if (data) {
          const firstName = this.helperService.convertToTitleCase(data.firstName);
          const lastName = this.helperService.convertToTitleCase(data.lastName);
          return firstName + ' ' + lastName;
        }
      },
      controlName: 'userContacts'
    });
    this.formFields.push({
      label: 'Account',
      name: 'account',
      type: 'select',
      dataScource: this.accounts,
      valueField: '_id',
      displayField: 'accountName',
      control: this.accountCtrl,
      controlName: 'account',
      onDataSelected: (data) => {
        const bal = this.cp.transform(data.balance, 'INR');
        this.accountBalanceCtrl.setValue(bal);
      }
    });
    this.formFields.push({
      label: 'Balance',
      name: 'accountBalance',
      type: 'display',
      control: this.accountBalanceCtrl,
      controlName: 'accountBalance',
    });
    this.formFields.push({
      label: 'Amount',
      name: 'transactionAmount',
      type: 'number',
      control: this.amountCtrl,
      controlName: 'transactionAmount',
      errors: [{
        name: 'insufficientFunds',
        message: 'Insufficient funds in account, please select other account'
      }]
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
      dataScource: this.expenseCategory,
      valueField: '_id',
      displayField: 'configName',
      control: this.expenseCategoryCtrl,
      renderer: (data, isSelected?) => {
        if (data && !isSelected) {
          return `${data.configName} <label class='select-sub-text'>(${data.configDesc})</label>`;
        } else if (data) {
          return `${data.configName} (${data.configDesc})`;
        }
      },
      controlName: 'transactionSubCategory'
    });
    this.formFields.push({
      label: 'Detail',
      name: 'transactionDetail',
      type: 'text',
      control: this.transactionDetailCtrl,
      controlName: 'transactionDetail',
      errors: [{
        name: 'required',
        message: 'This field is required'
      }]
    });
    return this.formFields;
  }

  createExpense() {
    if (this.expenseForm.valid) {
      if (this.isMultiUserExpense) {
        this.expenseForm.value.userContacts = JSON.stringify(this.usersSelected);
      } else {
        this.expenseForm.value.userContacts = undefined;
      }
      this.expenseForm.value.transactionDate = this.helperService.getUTCDate(this.expenseForm.value.transactionDate);
      this.financeService.addExpense(this.expenseForm.value).subscribe(
        (response: any) => {
          this.expenseForm.reset();
          this.msgService.showSuccessMessage(response.message);
        },
        (error: any) => {
          const errorMsg = error.error ? error.error.message : error.statusText;
          this.msgService.showErrorMessage(errorMsg);
        }
      );
    } else {
      this.msgService.showErrorMessage('Form contains error, please correct errors');
    }
  }

  updateMultiUserTransAmount() {
    if (this.usersSelected && this.usersSelected.length > 0 && this.expenseForm.value.transactionAmount) {
      let totalHeadCount = 0;
      this.usersSelected.forEach((user) => {
        totalHeadCount += user.selectionCount;
      });
      const perHeadAmount = this.expenseForm.value.transactionAmount / totalHeadCount;

      this.usersSelected.forEach((user) => {
        user.transactionAmount = user.selectionCount * perHeadAmount;
      });
    }
  }

  onMultiContactSelect(selectedUsers) {
    this.usersSelected = selectedUsers;
    this.updateMultiUserTransAmount();
  }
}
