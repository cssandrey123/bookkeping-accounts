import {NgModule} from '@angular/core';
import {AccountsScreenComponent} from './accounts-screen.component';
import {ReactiveFormsModule} from '@angular/forms';
import {CommonModule} from '@angular/common';
import {NgxCsvParserModule} from 'ngx-csv-parser';
import {MatButtonModule} from '@angular/material/button';
import {RouterModule} from '@angular/router';
import {MatIconModule} from '@angular/material/icon';


@NgModule({
  declarations: [
    AccountsScreenComponent
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    NgxCsvParserModule,
    MatButtonModule,
    RouterModule,
    MatIconModule
  ],
  exports: [
    AccountsScreenComponent
  ]
})

export class AccountsScreenModule {}
