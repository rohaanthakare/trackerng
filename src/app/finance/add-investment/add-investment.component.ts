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
  nameCtrl = new FormControl('', [Validators.required]);
  investmentStartDateCtrl = new FormControl();
  investmentCategory = [];
  isInvestmentCategoryLoaded = false;
  investmentCategoryCtrl = new FormControl();
  investmentForm: FormGroup = this.formBuilder.group({
    name: this.nameCtrl,
    startedOn: this.investmentStartDateCtrl,
    investmentType: this.investmentCategoryCtrl
  });
  constructor(private formBuilder: FormBuilder, private masterDataService: MasterDataService,
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
  }

  allDataLoaded() {
    if (this.isInvestmentCategoryLoaded) {
      this.modelForm.setFieldConfigs(this.getFormFields());
    }
  }

  getFormFields() {
    this.formFields = [];
    this.formFields.push({
      label: 'Name',
      name: 'name',
      type: 'text',
      control: this.nameCtrl,
      controlName: 'name',
      errors: [{
        name: 'required',
        message: 'This field is required'
      }]
    });
    this.formFields.push({
      label: 'Start Date',
      name: 'startedOn',
      type: 'date',
      control: this.investmentStartDateCtrl,
      controlName: 'startedOn'
    });
    this.formFields.push({
      label: 'Type',
      name: 'investmentType',
      type: 'select',
      dataScource: this.investmentCategory,
      valueField: '_id',
      displayField: 'configName',
      control: this.investmentCategoryCtrl,
      controlName: 'investmentType'
    });
    return this.formFields;
  }

  createInvestment() {
    if (this.investmentForm.valid) {
      this.investmentForm.value.startedOn = this.helperService.getUTCDate(this.investmentForm.value.startedOn);
      this.financeService.startNewInvestment(this.investmentForm.value).subscribe(
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
