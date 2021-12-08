import {NgModule} from '@angular/core';
import {ValidateTransactionsScreenComponent} from './validate-transactions-screen.component';
import {MatButtonModule} from '@angular/material/button';
import {MatAutocompleteModule} from '@angular/material/autocomplete';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {MatInputModule} from '@angular/material/input';
import {ComponentsModule} from '../../common';
import {CommonModule} from '@angular/common';
import {MatButtonToggleModule} from '@angular/material/button-toggle';

@NgModule({
  declarations: [
    ValidateTransactionsScreenComponent
  ],
  imports: [
    CommonModule,
    MatButtonModule,
    MatAutocompleteModule,
    ReactiveFormsModule,
    MatInputModule,
    ComponentsModule,
    MatButtonToggleModule,
    FormsModule,
  ],
  exports: [
    ValidateTransactionsScreenComponent
  ]
})

export class ValidateTransactionsScreenModule {}
