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
  @Input() fieldLabel: string;
  @Input() fieldCtrl: FormControl;
  @Input() parentControl: FormControl;
  @Input() sourceData: string[] = ['One', 'Two', 'Three'];
  filteredOptions: Observable<any[]>;
  @Input() valueField: string;
  @Input() displayField: string;
  @Input() selectedData: any;
  @Output() selectedDataChange: EventEmitter<any> = new EventEmitter<any>();
  constructor() { }

  ngOnInit() {
    this.displayFunction = this.displayFunction.bind(this);

    this.filteredOptions = this.fieldCtrl.valueChanges.pipe(
      startWith(''),
      map(value => this._filter(value))
    );
  }

  displayFunction(selectedData) {
    this.selectedData = selectedData;
    return selectedData ? selectedData[this.displayField] : undefined;
  }

  _filter(value: string) {
    if (this.parentControl && this.parentControl.value) {
      console.log(this.fieldLabel + ' has Parent Control need to filter source data');
      console.log('Parent Value - ' + this.parentControl.value);
      // this.sourceData.filter(option => );
    }
    return this.sourceData.filter(option => option[this.displayField].toLowerCase().includes(value));
  }
}
