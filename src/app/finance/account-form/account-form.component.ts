import { Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormControl, Validators } from '@angular/forms';
import { MasterDataService } from 'src/app/services/master-data.service';
import { ModelFormComponent } from 'src/app/core/model-form/model-form.component';
import { FinanceService } from '../finance.service';

@Component({
  selector: 'app-account-form',
  templateUrl: './account-form.component.html',
  styleUrls: ['./account-form.component.scss']
})
export class AccountFormComponent implements OnInit {
  @ViewChild(ModelFormComponent, {static: false}) modelForm: ModelFormComponent;
  accountTypes = [];
  isAccountTypesLoaded = false;
  banks = [];
  isBanksLoaded = false;
  branches = [];
  isBranchesLoaded = false;
  accountNameCtrl = new FormControl('', Validators.required);
  accountTypeCtrl = new FormControl('', Validators.required);
  accountNumberCtrl = new FormControl();
  bankCtrl = new FormControl();
  branchCtrl = new FormControl();
  balanceCtrl = new FormControl();
  accountForm = this.formBuilder.group({
    accountName: this.accountNameCtrl,
    accountType: this.accountTypeCtrl,
    accountNumber: this.accountNumberCtrl,
    bank: this.bankCtrl,
    branch: this.branchCtrl,
    balance: this.balanceCtrl
  });
  fieldConfigs = [];
  constructor(private formBuilder: FormBuilder, private masterDataService: MasterDataService,
              private financeService: FinanceService) { }

  ngOnInit() {
    this.masterDataService.getMasterDataForParent('ACCOUNT_TYPE').subscribe(
      (response: any) => {
        this.accountTypes = response.data;
        this.isAccountTypesLoaded = true;
        this.allDataLoaded();
      }
    );

    this.financeService.getBanks().subscribe(
      (response: any) => {
        this.banks = response.banks;
        this.isBanksLoaded = true;
        this.allDataLoaded();
      }
    );

    this.financeService.getBranches().subscribe(
      (response: any) => {
        this.branches = response.branches;
        this.isBranchesLoaded = true;
        this.allDataLoaded();
      }
    );
  }

  allDataLoaded() {
    if (this.isAccountTypesLoaded && this.isBanksLoaded && this.isBranchesLoaded) {
      this.modelForm.setFieldConfigs(this.getFieldConfigs());
    }
  }

  getFieldConfigs() {
    return [{
      label: 'Name',
      name: 'accountName',
      type: 'text',
      control: this.accountNameCtrl,
      controlName: 'accountName'
    }, {
      label: 'Type',
      name: 'accountType',
      type: 'select',
      dataScource: this.accountTypes,
      valueField: '_id',
      displayField: 'configName',
      control: this.accountNameCtrl,
      controlName: 'accountName'
    }, {
      label: 'Account Number',
      name: 'accountNumber',
      type: 'text',
      control: this.accountNumberCtrl,
      controlName: 'accountNumber'
    }, {
      label: 'Bank',
      name: 'bank',
      type: 'select',
      dataScource: this.banks,
      valueField: '_id',
      displayField: 'bankName',
      control: this.bankCtrl,
      controlName: 'bank'
    }, {
      label: 'Branch',
      name: 'branch',
      type: 'select',
      dataScource: this.branches,
      valueField: '_id',
      displayField: 'branchName',
      parentControl: this.bankCtrl,
      control: this.branchCtrl,
      controlName: 'branch'
    }, {
      label: 'Balance',
      name: 'balance',
      type: 'text',
      control: this.balanceCtrl,
      controlName: 'balance'
    }];
  }
}
