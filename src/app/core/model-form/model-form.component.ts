import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { FormGroup } from '@angular/forms';

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
  @Input() id: number;
  @Input() actionType: string;
  constructor() { }

  ngOnInit() {
  }

  onFormSubmit() {
    this.formSubmit.emit(this.formGroup);
  }

  getVaidationMessage(name) {
    this.hasError.emit(name);
  }

  resetForm() {
    console.log('Reset form clicked');
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
}
