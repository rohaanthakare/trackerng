import { Component, OnInit, Injector, ViewEncapsulation } from '@angular/core';
import { LoadDataService } from '../services/load-data.service';
import { DataLoadModule } from '../models/data-load-module.model';
import { UserService } from '../services/user.service';
import { RoleService } from '../services/role.service';
import { MasterDataService } from '../services/master-data.service';
import { MasterViewService } from '../services/master-view.service';
const loadDataModels = {
  UserService,
  RoleService,
  MasterDataService,
  MasterViewService
};

@Component({
  selector: 'app-data-loader',
  templateUrl: './data-loader.component.html',
  styleUrls: ['./data-loader.component.scss'],
  encapsulation: ViewEncapsulation.None
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
    this.loadData.getModuleData(moduleDetail.dataFileName, moduleDetail.dataFilePath).subscribe(
      data => {
        const allTextLines = data.split(/\r\n|\n/);
        const records = [];
        for (let index = 1; index < allTextLines.length; index++) {
          records.push(allTextLines[index].split(','));
        }

        moduleDetail.recordsToLoad = records.length;
        moduleDetail.remainingRecords = records.length;
        moduleDetail.recordsLoaded = 0;
        moduleDetail.recordsFailed = 0;
        moduleDetail.uploadedPercentage = 0;
        moduleDetail.failedPercentage = 0;
        moduleDetail.remainingPercentage = 100;
        this.moduleForLoading.push(moduleDetail);
        const moduleName = moduleDetail.moduleName + 'Service';
        const serviceObj = this.injector.get<any>(loadDataModels[moduleName]);
        serviceObj.initModelForDataLoad(records, moduleDetail, this);
      },
      error => {
        console.log('Inside Error');
      }
    );
  }

  updateProgress(moduleDetail: DataLoadModule, status) {
    if (status) {
      moduleDetail.recordsLoaded = moduleDetail.recordsLoaded + 1;
      moduleDetail.uploadedPercentage = (moduleDetail.recordsLoaded / moduleDetail.recordsToLoad) * 100;
    } else {
      moduleDetail.recordsFailed = moduleDetail.recordsFailed + 1;
      moduleDetail.failedPercentage = (moduleDetail.recordsFailed / moduleDetail.recordsToLoad) * 100;
    }

    moduleDetail.remainingRecords = moduleDetail.remainingRecords - 1;
    moduleDetail.remainingPercentage = (moduleDetail.remainingRecords / moduleDetail.recordsToLoad) * 100;
  }

}
