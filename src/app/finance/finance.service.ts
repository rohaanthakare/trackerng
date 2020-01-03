import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { DataLoadModule } from '../models/data-load-module.model';
import { Bank } from '../models/finance.model';
import { from } from 'rxjs';
import { concatMap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class FinanceService {

  constructor(private http: HttpClient) { }

  createBank(bankDetails) {
    return this.http.post(`${environment.baseUrl}/api/create_bank`, bankDetails);
  }

  uploadBanks(rows, moduleDetails: DataLoadModule, dataLoaderCmp) {
    return from(rows).pipe(
      concatMap(currentRow => {
        const bankObj = new Bank();
        bankObj.bankCode = currentRow[0];
        bankObj.bankName = currentRow[1];
        return this.createBank(bankObj);
      })
    );
  }
}
