import { Component, OnInit, Input, Output, EventEmitter, ViewChildren, QueryList } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { MessageService } from 'src/app/shared/services/message.service';
import { Router } from '@angular/router';
import { ModelSelectComponent } from '../model-select/model-select.component';

@Component({
  selector: 'app-model-form',
  templateUrl: './model-form.component.html',
  styleUrls: ['./model-form.component.scss']
})
export class ModelFormComponent implements OnInit {
  @Input() fieldConfigs: any;
  @Input() formGroup: FormGroup;
  @Output() formSubmit = new EventEmitter();
  @Output() hasError = new EventEmitter();
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
    this.fieldConfigs = configs;
  }

  getFieldConfigByModelName(fieldName) {
    return this.fieldConfigs.find(field => field.name === fieldName);
  }

  getVaidationMessage(name) {
    this.hasError.emit(name);
  }

  resetForm() {
    this.formGroup.reset();
  }

  handleSuccess(response, model) {
    this.msgService.showSuccessMessage(response.message, 'center', 'top');
    this.router.navigate(['/home/' + model + '/edit/' + response[model]._id]);
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
    const modelSelectCmps = this.modelSelect.toArray();
    if (fieldConfig.childModel) {
      const childCmp = modelSelectCmps.find(cmp => cmp.name === fieldConfig.childModel);
      if (childCmp) {
        childCmp.filterByParent(value[fieldConfig.valueField]);
      }
    }
  }
}
