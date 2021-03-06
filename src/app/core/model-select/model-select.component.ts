import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { FormControl } from '@angular/forms';
import { startWith, map } from 'rxjs/operators';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-model-select',
  templateUrl: './model-select.component.html',
  styleUrls: ['./model-select.component.scss']
})
export class ModelSelectComponent implements OnInit {
  myControl = new FormControl();
  @Input() fieldConfig: any;
  @Input() fieldLabel: string;
  @Input() name: string;
  @Input() fieldCtrl: FormControl;
  @Input() parentModel: string;
  @Input() sourceData: string[] = ['One', 'Two', 'Three'];
  allData = [];
  filteredOptions: Observable<any[]>;
  @Input() valueField: string;
  @Input() displayField: string;
  @Input() selectedData: any;
  @Output() selectedDataChange: EventEmitter<any> = new EventEmitter<any>();
  constructor() { }

  ngOnInit() {
    this.displayFunction = this.displayFunction.bind(this);
    this.allData = this.sourceData;
    this.filteredOptions = this.fieldCtrl.valueChanges.pipe(
      startWith(''),
      map(value => this._filter(value))
    );
  }

  updateSourceData(newData) {
    this.sourceData = newData;
    this.allData = newData;
    this.fieldCtrl.setValue('');
  }

  displayFunction(selectedData) {
    this.selectedData = selectedData;
    if (this.fieldConfig.renderer) {
      return this.fieldConfig.renderer(this.selectedData, true);
    }
    return selectedData ? selectedData[this.displayField] : undefined;
  }

  _filter(value: string) {
    return this.sourceData.filter(option => option[this.displayField].toLowerCase().includes(value));
  }

  onOptionSelected(event) {
    this.selectedDataChange.emit(this.selectedData);
  }

  filterByParent(filterValue) {
    this.sourceData = this.allData.filter(data => data[this.parentModel] === filterValue);
    this.fieldCtrl.setValue('');
  }

  getErrorMessage(fieldconfig) {
    const errorKey = Object.keys(fieldconfig.control.errors)[0];
    if (fieldconfig.errors) {
      return fieldconfig.errors.find((err) => err.name === errorKey).message;
    }
    return '';
  }
}
