import { Injectable } from '@angular/core';
import {NgxCsvParser, NgxCSVParserError} from 'ngx-csv-parser';
import {Observable} from 'rxjs';
import {map} from 'rxjs/operators';
import {AccountModel} from '../models/account.model';

@Injectable({
  providedIn: 'root'
})
export class AccountsService {

  constructor(private ngxCsvParser: NgxCsvParser ) { }

  parseCSV(file: File): Observable<AccountModel []> {
    return this.ngxCsvParser.parse(file, {header: false, delimiter: ','}).pipe(
      map((files) => {
        if (files instanceof NgxCSVParserError) {
          return null;
        } else {
          return files.map(rowFile => {
            return {
              id: rowFile[0],
              name: rowFile[1]
            };
          });
        }
      })
    );
  }

  saveAccounts(accounts: AccountModel[]): void {
    localStorage.setItem('saved_accounts', JSON.stringify(accounts));
  }

  getAccounts(): AccountModel[] {
    return JSON.parse(localStorage.getItem('saved_accounts'));
  }
}
