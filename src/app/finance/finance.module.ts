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
import { Routes, RouterModule } from '@angular/router';
import { CoreModule } from '../core/core.module';
import { ContactTransactionsComponent } from './contact-transactions/contact-transactions.component';

const routes: Routes = [{
  path: '',
  children: [{
    path: '',
    component: AccountListComponent
  }, {
    path: 'accounts',
    component: AccountListComponent
  }, {
    path: 'create-account',
    component: AccountFormComponent
  }, {
    path: 'edit-account/:id',
    component: AccountFormComponent
  }, {
    path: 'passbook',
    component: TransactionListComponent
  }, {
    path: 'deposit',
    component: DepositFormComponent
  }, {
    path: 'withdraw',
    component: WithdrawFormComponent
  }, {
    path: 'transfer',
    component: TransferFormComponent
  }, {
    path: 'add-expense',
    component: ExpenseFormComponent
  }, {
    path: 'budget-manager',
    component: BudgetManagerComponent
  }, {
    path: 'settlements',
    component: SettlementsListComponent
  }, {
    path: 'contact-transactions/:contact_id',
    component: ContactTransactionsComponent
  }]
}];
@NgModule({
  declarations: [AccountListComponent, AccountFormComponent, TransactionListComponent, ExpenseFormComponent, TransferFormComponent,
    DepositFormComponent, WithdrawFormComponent, BudgetManagerComponent, SettlementsListComponent, ContactTransactionsComponent],
  imports: [
    CommonModule, RouterModule.forChild(routes), CoreModule
  ]
})
export class FinanceModule { }
