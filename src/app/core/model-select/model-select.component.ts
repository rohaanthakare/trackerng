import { Component, OnInit, Input } from '@angular/core';
import { FormControl } from '@angular/forms';

@Component({
  selector: 'app-model-select',
  templateUrl: './model-select.component.html',
  styleUrls: ['./model-select.component.scss']
})
export class ModelSelectComponent implements OnInit {
  myControl = new FormControl();
  @Input() sourceData: string[] = ['One', 'Two', 'Three'];
  @Input() valueField: string;
  @Input() displayField: string;
  constructor() { }

  ngOnInit() {
  }

  displayFunction(selectedData) {
    console.log('Inside display function');
    console.log(selectedData);
    console.log(this.displayField);
    return selectedData ? selectedData[this.displayField] : undefined;
  }

}
