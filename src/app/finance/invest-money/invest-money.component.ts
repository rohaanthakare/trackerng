import { Component, Inject, Input, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { ModelFormComponent } from 'src/app/core/model-form/model-form.component';
import { HelperService } from 'src/app/shared/services/helper.service';
import { MessageService } from 'src/app/shared/services/message.service';
import { FinanceService } from '../finance.service';

@Component({
  selector: 'app-invest-money',
  templateUrl: './invest-money.component.html',
  styleUrls: ['./invest-money.component.scss']
})
export class InvestMoneyComponent implements OnInit {
  @ViewChild(ModelFormComponent, {static: true}) investmentForm: ModelFormComponent;
  @Input() investmentDetails: any;
  @Input() transactionType: string;
  formFields = [];
  accounts = [];
  transactionAmountCtrl = new FormControl('', [Validators.required]);
  transactionDateCtrl = new FormControl('', [Validators.required]);
  transactionAccountCtrl = new FormControl('');
  investmentNameCtrl = new FormControl();
  transactionDetailCtrl = new FormControl();
  investMoneyForm: FormGroup = this.formBuilder.group({
    investmentName: this.investmentNameCtrl,
    account: this.transactionAccountCtrl,
    transactionAmount: this.transactionAmountCtrl,
    transactionDate: this.transactionDateCtrl,
    transactionDetail: this.transactionDetailCtrl
  });
  constructor(@Inject(MAT_DIALOG_DATA) public data: any, private formBuilder: FormBuilder, private financeService: FinanceService,
    private msgService: MessageService, private helperService: HelperService, private dialogRef: MatDialogRef<InvestMoneyComponent>) { }

  ngOnInit() {
    this.investmentDetails = this.data.investmentDetail;
    this.transactionType = this.data.transactionType;
    this.financeService.getFinancialAccounts().subscribe(
      (response: any) => {
        this.accounts = response.data;
        this.investmentForm.setFieldConfigs(this.getFormFields());
      }
    );
  }

  getFormFields() {
    this.formFields = [];
    this.formFields.push({
      label: 'Investment Name',
      name: 'investmentName',
      type: 'display',
      control: this.investmentNameCtrl,
      controlName: 'investmentName'
    });

    this.investmentNameCtrl.setValue(this.investmentDetails.name);

    this.formFields.push({
      label: 'Account',
      name: 'account',
      type: 'select',
      dataScource: this.accounts,
      valueField: '_id',
      displayField: 'accountName',
      control: this.transactionAccountCtrl,
      controlName: 'account'
    });

    this.formFields.push({
      label: (this.transactionType) == 'INVEST_MONEY' ? 'Investment Amount' : 'Maturity Amount',
      name: 'transactionAmount',
      type: 'number',
      control: this.transactionAmountCtrl,
      controlName: 'transactionAmount'
    });

    this.formFields.push({
      label: 'Date',
      name: 'transactionDate',
      type: 'date',
      control: this.transactionDateCtrl,
      controlName: 'transactionDate'
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

  investMoney() {
    if (this.investMoneyForm.valid) {
      this.investMoneyForm.value.investmentDetail = this.investmentDetails;
      this.investMoneyForm.value.transactionDate = this.helperService.getUTCDate(this.investMoneyForm.value.transactionDate);
      if (this.transactionType === 'INVEST_MONEY') {
        this.financeService.investMoney(this.investMoneyForm.value).subscribe(
          (response: any) => {
            this.investMoneyForm.reset();
            this.msgService.showSuccessMessage(response.message);
            this.dialogRef.close();
          },
          error => {
            this.msgService.showErrorMessage('Error while investing money, please try again');
          }
        );
      } else {
        this.financeService.closeInvestment(this.investMoneyForm.value).subscribe(
          (response: any) => {
            this.investMoneyForm.reset();
            this.msgService.showSuccessMessage(response.message);
            this.dialogRef.close();
          },
          error => {
            this.msgService.showErrorMessage('Error while closing investment, please try again');
          }
        );
      }
    } else {
      this.msgService.showErrorMessage('Form contains error, please correct errors');
    }
  }
}
