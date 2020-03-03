import { Component, OnInit, Input, Output, EventEmitter, ViewChild } from '@angular/core';
import { FormControl } from '@angular/forms';
import { Observable } from 'rxjs';
import { startWith, map } from 'rxjs/operators';
import { MatAutocomplete } from '@angular/material/autocomplete';

@Component({
  selector: 'app-model-selection-list',
  templateUrl: './model-selection-list.component.html',
  styleUrls: ['./model-selection-list.component.scss']
})
export class ModelSelectionListComponent implements OnInit {
  @Input() fieldConfig: any;
  @Input() fieldCtrl: FormControl;
  @Input() fieldLabel: string;
  @Input() sourceData: string[] = ['One', 'Two', 'Three'];
  @Input() displayField: string;
  @Input() name: string;
  @Input() valueField: string;
  @Output() dataSelectionChange: EventEmitter<any> = new EventEmitter<any>();
  @ViewChild('auto', {static: false}) matAutocomplete: MatAutocomplete;
  allData = [];
  filteredOptions: Observable<any[]>;
  @Input() selectedData: any;
  dataSelected = [];
  removable = true;
  selectable = true;
  constructor() {
  }

  ngOnInit() {
    this.displayFunction = this.displayFunction.bind(this);
    this.allData = this.sourceData;
    this.filteredOptions = this.fieldCtrl.valueChanges.pipe(
      startWith(''),
      map(value => this._filter(value))
    );
  }

  displayFunction(selectedData) {
    this.selectedData = selectedData;
    if (this.fieldConfig.renderer) {
      return this.fieldConfig.renderer(this.selectedData);
    }
    return selectedData ? selectedData[this.displayField] : undefined;
  }

  _filter(value: string) {
    return this.sourceData.filter(option => option[this.displayField].toLowerCase().includes(value));
  }
  onOptionSelected(event) {
    const index = this.dataSelected.indexOf(this.selectedData);

    if (index >= 0) {
      this.dataSelected[index].selectionCount++;
    } else {
      this.selectedData.selectionCount = 1;
      this.dataSelected.push(this.selectedData);
    }
    this.dataSelectionChange.emit(this.dataSelected);
  }

  removeData(data) {
    const index = this.dataSelected.indexOf(data);

    if (index >= 0) {
      this.dataSelected.splice(index, 1);
    }
  }
}
