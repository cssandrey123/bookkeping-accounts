import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {LandingScreenComponent} from './screens/landing-screen';
import {TransactionRulesScreenComponent} from './screens/transaction-rules-screen';
import {ValidateTransactionsScreenComponent} from './screens/validate-transactions-screen';
import {AccountsScreenComponent} from './screens/accounts-screen';


const routes: Routes = [
  {
    path: '',
    component: LandingScreenComponent,
    children: [
      {
        path: '',
        component: AccountsScreenComponent
      },
      {
        path: 'rules',
        component: TransactionRulesScreenComponent
      },
      {
        path: 'validate',
        component: ValidateTransactionsScreenComponent
      }
    ]
  },
  {
    path: '**',
    redirectTo: ''
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
