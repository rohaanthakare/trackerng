import { Component, OnInit, Injector } from '@angular/core';
import { LoadDataService } from '../services/load-data.service';
import { DataLoadModule } from '../models/data-load-module.model';
import { UserService } from '../services/user.service';
const loadDataModels = {
  UserService
};

@Component({
  selector: 'app-data-loader',
  templateUrl: './data-loader.component.html',
  styleUrls: ['./data-loader.component.scss']
})
export class DataLoaderComponent implements OnInit {
  totalModules: number;
  moduleForLoading: DataLoadModule[] = [];
  constructor(private loadData: LoadDataService, private injector: Injector) { }

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
          this.readDataFile(newModule);
        }
      },
      error => {
        console.log(error);
      }
    );
  }

  readDataFile(moduleDetail: DataLoadModule) {
    this.loadData.getModuleData().subscribe(
      data => {
        const allTextLines = data.split(/\r\n|\n/);
        const records = [];
        for (let index = 1; index < allTextLines.length; index++) {
          records.push(allTextLines[index].split(','));
        }

        moduleDetail.recordsToLoad = records.length;
        moduleDetail.recordsLoaded = 0;
        moduleDetail.recordsFailed = 0;
        this.moduleForLoading.push(moduleDetail);
        const moduleName = moduleDetail.moduleName + 'Service';
        const serviceObj = this.injector.get<any>(loadDataModels[moduleName]);
        serviceObj.initModelForDataLoad(records, moduleDetail);
      },
      error => {
        console.log('Inside Error');
      }
    );
  }

}
