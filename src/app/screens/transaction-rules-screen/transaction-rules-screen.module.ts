import {NgModule} from '@angular/core';
import {TransactionRulesScreenComponent} from './transaction-rules-screen.component';
import {CommonModule} from '@angular/common';
import {MatTableModule} from '@angular/material/table';
import { TransactionRulesTableComponent } from './transaction-rules-table/transaction-rules-table.component';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {MatButtonModule} from '@angular/material/button';
import {MatDialogModule} from '@angular/material/dialog';
import { TransactionRulesModalComponent } from './transaction-rules-modal/transaction-rules-modal.component';
import {MatAutocompleteModule} from '@angular/material/autocomplete';
import {ReactiveFormsModule} from '@angular/forms';
import {MatInputModule} from '@angular/material/input';
import {ComponentsModule} from '../../common';
import {MatIconModule} from '@angular/material/icon';
import {MatPaginatorModule} from '@angular/material/paginator';

@NgModule({
  declarations: [
    TransactionRulesScreenComponent,
    TransactionRulesTableComponent,
    TransactionRulesModalComponent
  ],
  imports: [
    CommonModule,
    MatTableModule,
    BrowserAnimationsModule,
    MatButtonModule,
    MatDialogModule,
    MatAutocompleteModule,
    ReactiveFormsModule,
    MatInputModule,
    ComponentsModule,
    MatIconModule,
    MatPaginatorModule
  ],
  exports: [
    TransactionRulesScreenComponent
  ]
})

export class TransactionRulesScreenModule {}
