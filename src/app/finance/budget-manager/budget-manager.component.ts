import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { MasterDataService } from 'src/app/services/master-data.service';
import { GlobalConstants } from 'src/app/global/global.enum';
import { FinanceService } from '../finance.service';
import { MessageService } from 'src/app/shared/services/message.service';

@Component({
  selector: 'app-budget-manager',
  templateUrl: './budget-manager.component.html',
  styleUrls: ['./budget-manager.component.scss']
})
export class BudgetManagerComponent implements OnInit {
  colors = GlobalConstants.COLORS;
  profileId: any;
  budgetColor = 'primary';
  view = [];
  budgetForm: FormGroup = this.formBuilder.group({});
  testing: any;
  expenseCategory = [];
  remainingBalance = 0;
  remainingPercent = 0;
  chartData = [];
  financialProfile: any = {
  };
  constructor(private formBuilder: FormBuilder, private masterDataService: MasterDataService, private financialService: FinanceService,
              private msgService: MessageService) { }

  ngOnInit() {
    this.masterDataService.getMasterDataForParent('EXPENSE_CATEGORY').subscribe(
      (response: any) => {
        this.expenseCategory = response.data;
        this.financialProfile.budgetConfig = {};
        this.getFinancialProfile();
      }
    );
  }

  getFinancialProfile() {
    this.financialService.getFinancialProfile().subscribe(
      (response: any) => {
        this.profileId = response.profile._id;
        this.financialProfile = response.profile;
        this.updateRemainingBalance();
      }
    );
  }

  incomeChanged(event) {
    this.financialProfile.monthlyIncome = event.target.value;
    this.remainingBalance = this.financialProfile.monthlyIncome;
    this.remainingPercent = (this.remainingBalance / this.financialProfile.monthlyIncome) * 100;
    this.updateRemainingBalance();
  }

  updateRemainingBalance() {
    const tmpData = [];
    this.remainingBalance = this.financialProfile.monthlyIncome;
    for (const key in this.financialProfile.budgetConfig) {
      if (this.financialProfile.budgetConfig[key] > 0) {
        this.remainingBalance = this.remainingBalance - this.financialProfile.budgetConfig[key];
        this.remainingPercent = (this.remainingBalance / this.financialProfile.monthlyIncome) * 100;
        if (this.remainingPercent < 10) {
          this.budgetColor = 'warn';
        } else if (this.remainingPercent > 10 && this.remainingPercent < 40) {
          this.budgetColor = 'accent';
        }
        const chartName = this.expenseCategory.find((c) => c.configCode === key);
        tmpData.push({
          name: chartName.configName,
          value: this.financialProfile.budgetConfig[key]
        });
      }
    }

    this.chartData = tmpData;
  }

  onMatSliderChange(slider, config) {
    this.financialProfile.budgetConfig[config.configCode] = slider.value;
    this.updateRemainingBalance();
  }

  onMatInputChange(event, config) {
    this.financialProfile.budgetConfig[config.configCode] = event.target.value;
    this.updateRemainingBalance();
  }

  saveBudget() {
    if (this.profileId) {
      this.financialService.updateFinancialProfile(this.profileId, this.financialProfile).subscribe(
        (response: any) => {
          this.msgService.showSuccessMessage(response.message);
        }
      );
    } else {
      this.financialService.createFinancialProfile(this.financialProfile).subscribe(
        (response: any) => {
          this.msgService.showSuccessMessage(response.message);
        }
      );
    }
  }
}
