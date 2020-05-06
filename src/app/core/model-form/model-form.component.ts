import { Component, OnInit, Input, Output, EventEmitter, ViewChildren, QueryList, ViewEncapsulation } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { MessageService } from 'src/app/shared/services/message.service';
import { Router } from '@angular/router';
import { ModelSelectComponent } from '../model-select/model-select.component';

@Component({
  selector: 'app-model-form',
  templateUrl: './model-form.component.html',
  styleUrls: ['./model-form.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class ModelFormComponent implements OnInit {
  @Input() submitActionName: string;
  @Input() submitActionIcon: string;
  @Input() fieldConfigs: any;
  @Input() noElevation: any;
  allFieldConfigs: any;
  @Input() formGroup: FormGroup;
  @Output() formSubmit = new EventEmitter();
  @Output() hasError = new EventEmitter();
  @Output() chipDataSelected: EventEmitter<any> = new EventEmitter();
  @Input() idField: number;
  @Input() formTitle: string;
  @Input() actionType: string;
  @ViewChildren(ModelSelectComponent) modelSelect: QueryList<ModelSelectComponent>;

  showPassword = false;
  constructor(private msgService: MessageService, private router: Router) { }

  ngOnInit() {
  }

  onFormSubmit() {
    this.formSubmit.emit(this.formGroup);
  }

  setFieldConfigs(configs) {
    this.allFieldConfigs = configs;
    this.fieldConfigs = configs;
  }

  addField(fieldName) {
    const fieldToAdd = this.allFieldConfigs.find((config) => config.name === fieldName);
    const fieldIndex = this.allFieldConfigs.findIndex((config) => config.name === fieldName);
    this.fieldConfigs.splice(fieldIndex, 0, fieldToAdd);
  }

  updateSelectFieldDataScource(fieldName, newData) {
    const modelSelectCmps = this.modelSelect.toArray();
    const fieldCmp = modelSelectCmps.find(cmp => cmp.name === fieldName);
    fieldCmp.updateSourceData(newData);
  }

  removeField(fieldName) {
    this.fieldConfigs = this.fieldConfigs.filter((field) => field.name !== fieldName);
  }

  getFieldConfigByModelName(fieldName) {
    return this.fieldConfigs.find(field => field.name === fieldName);
  }

  getVaidationMessage(name) {
    this.hasError.emit(name);
  }

  getErrorMessage(fieldconfig) {
    const errorKey = Object.keys(fieldconfig.control.errors)[0];
    if (fieldconfig.errors) {
      return fieldconfig.errors.find((err) => err.name === errorKey).message;
    }
    return '';
  }

  onDataSelectionChange(dataSelected) {
    this.chipDataSelected.emit(dataSelected);
  }

  resetForm() {
    this.formGroup.reset();
    Object.keys(this.formGroup.controls).forEach(key => {
      this.formGroup.get(key).setErrors(null) ;
    });
  }

  handleSuccess(response, modelName, moduleName, action?) {
    action = (action) ? action : 'edit';
    this.msgService.showSuccessMessage(response.message, 'center', 'top');
    this.router.navigate(['/home/' + moduleName + '/' + action + '/' + response[modelName]._id]);
  }

  setValues(modelValue) {
    for (const key of Object.keys(modelValue)) {
      this.fieldConfigs.forEach((currentField) => {
        if (currentField.name === key && modelValue[key] !== 'null') {
          currentField.control.setValue(modelValue[key]);
        }
      });
    }
  }

  showPasswordClicked() {
    this.showPassword = true;
  }

  optionSelected(value, fieldConfig) {
    if (fieldConfig.onDataSelected) {
      fieldConfig.onDataSelected(value);
    }
    const modelSelectCmps = this.modelSelect.toArray();
    if (fieldConfig.childModel) {
      const childCmp = modelSelectCmps.find(cmp => cmp.name === fieldConfig.childModel);
      if (childCmp) {
        childCmp.filterByParent(value[fieldConfig.valueField]);
      }
    }
  }
}
