import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { MessageService } from 'src/app/shared/services/message.service';
import { Router } from '@angular/router';

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

  showPassword = false;
  constructor(private msgService: MessageService, private router: Router) { }

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

  handleSuccess(response, model) {
    this.msgService.showSuccessMessage(response.message, 'center', 'top');
    this.router.navigate([model + '/' + response.id]);
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
}
