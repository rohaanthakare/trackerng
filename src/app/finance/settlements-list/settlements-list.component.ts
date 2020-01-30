import { Component, OnInit } from '@angular/core';
import { HelperService } from 'src/app/shared/services/helper.service';

@Component({
  selector: 'app-settlements-list',
  templateUrl: './settlements-list.component.html',
  styleUrls: ['./settlements-list.component.scss']
})
export class SettlementsListComponent implements OnInit {
  displayedColumns: string[] = ['name', 'settlementType', 'settlementAmount'];
  columnDefs = [{
    name: 'name',
    header: 'Name',
    field: 'NAME',
    renderer: (row) => {
      const firstName = this.helperService.convertToTitleCase(row.firstName);
      const lastName = this.helperService.convertToTitleCase(row.lastName);
      return firstName + ' ' + lastName;
    }
  }, {
    name: 'settlementType',
    header: 'Email',
    field: 'settlementType',
    renderer: (row) => {
      return row.settlementType.configName;
    }
  }, {
    name: 'settlementAmount',
    header: 'Amount',
    field: 'settlementAmount',
    renderer: (row) => {
      const settlementAmount = row.settlementAmount.toFixed(2);
      if (row.settlementType.configCode === 'MONEY_TO_TAKE') {
        return `<label class='success-text'><i class='fas fa-rupee-sign mr-1'></i>${settlementAmount}</label>`;
      } else {
        return `<label class='error-text'><i class='fas fa-rupee-sign mr-1'></i>${settlementAmount}</label>`;
      }
    }
  }];

  constructor(private helperService: HelperService) { }

  ngOnInit() {
  }

}
