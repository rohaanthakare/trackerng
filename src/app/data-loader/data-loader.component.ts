import { Component, OnInit } from '@angular/core';
import { LoadDataService } from '../services/load-data.service';

@Component({
  selector: 'app-data-loader',
  templateUrl: './data-loader.component.html',
  styleUrls: ['./data-loader.component.scss']
})
export class DataLoaderComponent implements OnInit {

  constructor(private loadData: LoadDataService) { }

  ngOnInit() {
    this.loadData.getLoadDataConfig().subscribe(
      data => {
        console.log('Inside Data');
        const tmpdata = new DOMParser();
        const tmpXML = tmpdata.parseFromString(data, 'text/xml');
        console.log(data);
      },
      error => {
        console.log(error);
      }
    );
  }

}
