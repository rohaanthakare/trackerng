import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { DataLoadModule } from '../models/data-load-module.model';
import { Bank, Branch } from '../models/finance.model';
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

  getBanks() {
    return this.http.get(`${environment.baseUrl}/api/banks`);
  }

  createBranch(branchDetails) {
    return this.http.post(`${environment.baseUrl}/api/create_branch`, branchDetails);
  }

  getBranches() {
    return this.http.get(`${environment.baseUrl}/api/branches`);
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

  uploadBranch(rows, moduleDetails: DataLoadModule, dataLoaderCmp) {
    return from(rows).pipe(
      concatMap(currentRow => {
        const branchObj = new Branch();
        branchObj.branchCode = currentRow[0];
        branchObj.branchName = currentRow[1];
        branchObj.branchIfsc = currentRow[2];
        branchObj.branchMicr = currentRow[3];
        branchObj.address = currentRow[4];
        branchObj.city = currentRow[5];
        branchObj.state = currentRow[6];
        branchObj.country = currentRow[7];
        branchObj.bank = currentRow[8];
        return this.createBranch(branchObj);
      })
    );
  }

  getFinancialAccounts() {
    return this.http.get(`${environment.baseUrl}/api/get_financial_accounts`);
  }

  createFinancialAccount(accountDetails) {
    return this.http.post(`${environment.baseUrl}/api/create_financial_account`, {
      accountDetails
    });
  }

  updateFinancialAccount(accountDetails) {
    return this.http.put(`${environment.baseUrl}/api/create_financial_account`, {
      accountDetails
    });
  }
}
