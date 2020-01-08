import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AccountListComponent } from './account-list/account-list.component';
import { AccountFormComponent } from './account-form/account-form.component';
import { TransactionListComponent } from './transaction-list/transaction-list.component';
import { ExpenseFormComponent } from './expense-form/expense-form.component';
import { TransferFormComponent } from './transfer-form/transfer-form.component';
import { DepositFormComponent } from './deposit-form/deposit-form.component';
import { WithdrawFormComponent } from './withdraw-form/withdraw-form.component';
import { BudgetManagerComponent } from './budget-manager/budget-manager.component';
import { SettlementsListComponent } from './settlements-list/settlements-list.component';



@NgModule({
  declarations: [AccountListComponent, AccountFormComponent, TransactionListComponent, ExpenseFormComponent, TransferFormComponent,
    DepositFormComponent, WithdrawFormComponent, BudgetManagerComponent, SettlementsListComponent],
  imports: [
    CommonModule
  ]
})
export class FinanceModule { }
