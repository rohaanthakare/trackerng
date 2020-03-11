import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { MasterDataService } from 'src/app/services/master-data.service';

@Component({
  selector: 'app-budget-manager',
  templateUrl: './budget-manager.component.html',
  styleUrls: ['./budget-manager.component.scss']
})
export class BudgetManagerComponent implements OnInit {
  budgetForm: FormGroup = this.formBuilder.group({});
  testing: any;
  expenseCategory = [];
  financialProfile: any = {
  };
  constructor(private formBuilder: FormBuilder, private masterDataService: MasterDataService) { }

  ngOnInit() {
    this.masterDataService.getMasterDataForParent('EXPENSE_CATEGORY').subscribe(
      (response: any) => {
        this.expenseCategory = response.data;
        this.financialProfile.budgetConfig = {};
        this.expenseCategory.forEach((c) => {
          this.financialProfile.budgetConfig[c.configCode] = 0;
        });
      }
    );
  }

  incomeChanged(event) {
    this.financialProfile.monthlyIncome = event.target.value;
  }

  onMatSliderChange(slider, val) {
    console.log(slider);
    console.log(val);
  }
}
