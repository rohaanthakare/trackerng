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
  constructor() { }

  ngOnInit() {
  }

  onFormSubmit() {
    this.formSubmit.emit(this.formGroup);
  }

  getVaidationMessage(name) {
    console.log('Inside Model Form - ' + name);
    this.hasError.emit(name);
  }

  resetForm() {
    console.log('Reset form clicked');
  }
}
