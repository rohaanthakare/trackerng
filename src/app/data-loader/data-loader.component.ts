import { Component, OnInit, Injector, ViewEncapsulation } from '@angular/core';
import { LoadDataService } from '../services/load-data.service';
import { DataLoadModule } from '../models/data-load-module.model';
import { UserService } from '../services/user.service';
import { RoleService } from '../services/role.service';
import { MasterDataService } from '../services/master-data.service';
import { MasterViewService } from '../services/master-view.service';
import { FinanceService } from '../finance/finance.service';
import { from } from 'rxjs';
import { concatMap } from 'rxjs/operators';
const loadDataModels = {
  UserService,
  RoleService,
  MasterDataService,
  MasterViewService,
  FinanceService
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
  filesToLoad = [];
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
          newModule.actionName = currentModule.getElementsByTagName('ActionName')[0].textContent;
          newModule.action = currentModule.getElementsByTagName('Action')[0].textContent;
          // this.readDataFile(newModule);
          this.filesToLoad.push(newModule);
        }
      },
      error => {
        console.log(error);
      },
      () => {
        console.log('XML File loaded');
        this.readDataFile();
      }
    );
  }

  readDataFile() {
    from(this.filesToLoad).pipe(
      concatMap(param => this.loadData.getModuleData(param))
    ).subscribe(
      data => {
        const moduleDetail = data.moduleDetail;
        const allTextLines = data.content.split(/\r\n|\n/);
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
        moduleDetail.records = records;
        this.moduleForLoading.push(moduleDetail);
      },
      error => {
        console.log('Inside Error');
      },
      () => {
        this.uploadData();
      }
    );
  }

  uploadData() {
    let tmpIndex = -1;
    from(this.moduleForLoading).pipe(
      concatMap(param => {
        tmpIndex++;
        const moduleName = param.moduleName + 'Service';
        const serviceObj = this.injector.get<any>(loadDataModels[moduleName]);
        return serviceObj[param.action](param.records, param, this);
      })
    ).subscribe(
      data => {
        this.updateProgress(this.moduleForLoading[tmpIndex], true);
        console.log('Uploaded Complete - ' + tmpIndex);
      },
      error => console.log(error),
      () => {
        console.log('File Uploaded Full');
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
