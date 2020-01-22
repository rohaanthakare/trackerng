import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormControl } from '@angular/forms';

@Component({
  selector: 'app-deposit-form',
  templateUrl: './deposit-form.component.html',
  styleUrls: ['./deposit-form.component.scss']
})
export class DepositFormComponent implements OnInit {
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
  constructor(private formBuilder: FormBuilder) { }

  ngOnInit() {
  }

}
