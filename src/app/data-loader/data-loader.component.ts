import { Component, OnInit } from '@angular/core';
import { LoadDataService } from '../services/load-data.service';
import { DataLoadModule } from '../models/data-load-module.model';

@Component({
  selector: 'app-data-loader',
  templateUrl: './data-loader.component.html',
  styleUrls: ['./data-loader.component.scss']
})
export class DataLoaderComponent implements OnInit {
  totalModules: number;
  moduleForLoading: DataLoadModule[] = [];
  constructor(private loadData: LoadDataService) { }

  ngOnInit() {
    this.loadData.getLoadDataConfig().subscribe(
      data => {
        const xmlParser = new DOMParser();
        const loadDataXML = xmlParser.parseFromString(data, 'text/xml');
        this.totalModules = loadDataXML.getElementsByTagName('LoadDataModule').length;
        for (let index = 0; index < this.totalModules; index++) {
          const currentModule = loadDataXML.getElementsByTagName('LoadDataModule')[index];
          const newModule = new DataLoadModule();
          newModule.moduleName = currentModule.getElementsByTagName('ModuleName')[0].textContent;
          newModule.dataFileName = currentModule.getElementsByTagName('DataFileName')[0].textContent;
          newModule.dataFilePath = currentModule.getElementsByTagName('DataFilePath')[0].textContent;
          this.moduleForLoading.push(newModule);
          this.readDataFile(newModule);
        }
      },
      error => {
        console.log(error);
      }
    );
  }

  readDataFile(moduleDetail) {
    this.loadData.getModuleData().subscribe(
      data => {
        const allTextLines = data.split(/\r\n|\n/);
        console.log(allTextLines);
      },
      error => {
        console.log('Inside Error');
      }
    );
  }

}
