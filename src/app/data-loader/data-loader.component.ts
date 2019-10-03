import { Component, OnInit } from '@angular/core';
import { LoadDataService } from '../services/load-data.service';
import { DataLoadModule } from '../models/data-load-module.model';

@Component({
  selector: 'app-data-loader',
  templateUrl: './data-loader.component.html',
  styleUrls: ['./data-loader.component.scss']
})
export class DataLoaderComponent implements OnInit {
  moduleForLoading: DataLoadModule[] = [];
  constructor(private loadData: LoadDataService) { }

  ngOnInit() {
    this.loadData.getLoadDataConfig().subscribe(
      data => {
        console.log('Inside Data');
        const xmlParser = new DOMParser();
        const loadDataXML = xmlParser.parseFromString(data, 'text/xml');
        loadDataXML.getElementsByTagName('LoadDataModule').length;
        console.log(data);
      },
      error => {
        console.log(error);
      }
    );
  }

}
