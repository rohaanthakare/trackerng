import { Component, OnInit, ViewChild, ViewEncapsulation } from '@angular/core';
import { ModelListComponent } from '../core/model-list/model-list.component';

@Component({
  selector: 'app-skill',
  templateUrl: './skill.component.html',
  styleUrls: ['./skill.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class SkillComponent implements OnInit {
  @ViewChild(ModelListComponent, {static: true}) listCmp: ModelListComponent;
  skills = [{
    name: 'Angular',
    rating: 3.5,
    iconClass: 'fab fa-angular',
    exp: '2 Years',
    last_used: 'Currently Working'
  }, {
    name: 'MongoDB',
    rating: 2.5,
    iconClass: 'fas fa-database',
    exp: '10 Months',
    last_used: 'Currently Working'
  }];
  displayedColumns: string[] = ['name', 'exp', 'last_used', 'rating'];
  columnDefs = [{
    name: 'name',
    header: 'Skill',
    field: 'name',
    renderer: (row) => {
      return `<i class='${row.iconClass} mr-1 skill-icon'></i>
        <span class='skill-label'>${row.name}</span>`;
    }
  }, {
    name: 'exp',
    header: 'Skill Experience',
    field: 'exp'
  }, {
    name: 'last_used',
    header: 'Last Used',
    field: 'last_used'
  }, {
    name: 'rating',
    header: '',
    field: 'rating',
    renderer: (row) => {
      let ratingStr = '';
      for (let index = 0; index < 5; index++) {
        if (row.rating < index) {
          ratingStr = ratingStr + '<i class="far fa-star"></i>';
        } else if (row.rating > index && row.rating <= index + 1) {
          ratingStr = ratingStr + '<i class="fas fa-star-half-alt"></i>';
        } else {
          ratingStr = ratingStr + '<i class="fas fa-star"></i>';
        }
      }
      return ratingStr;
    }
  }];
  constructor() { }

  ngOnInit() {
    this.listCmp.setTableData(this.skills);
  }

}
