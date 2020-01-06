import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { FormControl } from '@angular/forms';

@Component({
  selector: 'app-model-select',
  templateUrl: './model-select.component.html',
  styleUrls: ['./model-select.component.scss']
})
export class ModelSelectComponent implements OnInit {
  myControl = new FormControl();
  @Input() fieldLabel: string;
  @Input() fieldCtrl: FormControl;
  @Input() sourceData: string[] = ['One', 'Two', 'Three'];
  @Input() valueField: string;
  @Input() displayField: string;
  @Input() selectedData: any;
  @Output() selectedDataChange: EventEmitter<any> = new EventEmitter<any>();
  constructor() { }

  ngOnInit() {
    this.displayFunction = this.displayFunction.bind(this);
  }

  displayFunction(selectedData) {
    this.selectedData = selectedData;
    return selectedData ? selectedData[this.displayField] : undefined;
  }

}
