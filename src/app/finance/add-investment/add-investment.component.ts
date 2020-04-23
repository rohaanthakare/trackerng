import { Component, OnInit, ViewChild } from '@angular/core';
import { ModelFormComponent } from 'src/app/core/model-form/model-form.component';
import { FormControl, Validators, FormGroup, FormBuilder } from '@angular/forms';
import { MasterDataService } from 'src/app/services/master-data.service';
import { ContactService } from 'src/app/contact/contact.service';
import { MessageService } from 'src/app/shared/services/message.service';
import { FinanceService } from '../finance.service';
import { HelperService } from 'src/app/shared/services/helper.service';
import { CurrencyPipe } from '@angular/common';

@Component({
  selector: 'app-add-investment',
  templateUrl: './add-investment.component.html',
  styleUrls: ['./add-investment.component.scss']
})
export class AddInvestmentComponent implements OnInit {
  @ViewChild(ModelFormComponent, {static: false}) modelForm: ModelFormComponent;
  formFields = [];
  accounts = [];
  isAccountsLoaded = false;
  accountCtrl = new FormControl();
  amountCtrl = new FormControl('', [Validators.required]);
  transactionDateCtrl = new FormControl('', [Validators.required]);
  transactionDetailCtrl = new FormControl('', [Validators.required]);
  accountBalanceCtrl = new FormControl();
  investmentCategory = [];
  isInvestmentCategoryLoaded = false;
  investmentCategoryCtrl = new FormControl();
  investmentForm: FormGroup = this.formBuilder.group({
    account: this.accountCtrl,
    transactionAmount: this.amountCtrl,
    transactionDate: this.transactionDateCtrl,
    transactionDetail: this.transactionDetailCtrl,
    transactionSubCategory: this.investmentCategoryCtrl,
    accountBalance: this.accountBalanceCtrl
  }, {
    validators: [this.helperService.transAmountValidator('transactionAmount', 'account')]
  });
  constructor(private formBuilder: FormBuilder, private masterDataService: MasterDataService, private contactService: ContactService,
              private helperService: HelperService, private financeService: FinanceService, private msgService: MessageService,
              private cp: CurrencyPipe) { }

  ngOnInit() {
    this.masterDataService.getMasterDataForParent('INVESTMENT_CATEGORY').subscribe(
      (response: any) => {
        this.investmentCategory = response.data;
        this.isInvestmentCategoryLoaded = true;
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
  }

  allDataLoaded() {
    if (this.isInvestmentCategoryLoaded && this.isAccountsLoaded) {
      this.modelForm.setFieldConfigs(this.getFormFields());
    }
  }

  getFormFields() {
    this.formFields = [];
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
      dataScource: this.investmentCategory,
      valueField: '_id',
      displayField: 'configName',
      control: this.investmentCategoryCtrl,
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

  createInvestment() {
    if (this.investmentForm.valid) {
      this.investmentForm.value.transactionDate = this.helperService.getUTCDate(this.investmentForm.value.transactionDate);
      this.financeService.addInvestment(this.investmentForm.value).subscribe(
        (response: any) => {
          this.investmentForm.reset();
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
}
