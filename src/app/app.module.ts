import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import {ValidateTransactionsScreenModule} from './screens/validate-transactions-screen';
import {TransactionRulesScreenModule} from './screens/transaction-rules-screen';
import {AccountsScreenModule} from './screens/accounts-screen';
import {LandingScreenModule} from './screens/landing-screen';
import {RouterModule} from '@angular/router';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    RouterModule,
    ValidateTransactionsScreenModule,
    TransactionRulesScreenModule,
    AccountsScreenModule,
    LandingScreenModule,
    BrowserAnimationsModule,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
