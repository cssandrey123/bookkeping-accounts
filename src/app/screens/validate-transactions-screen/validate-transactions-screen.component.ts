import { Component, OnInit } from '@angular/core';
import {FormControl, FormGroup} from '@angular/forms';
import {
  AccountModel,
  AccountsService,
  TransactionRuleModel,
  TransactionRulesService,
  differentValuesValidator,
  accountValidator
} from '../../common';
import {map, startWith} from 'rxjs/operators';
import {combineLatest, Observable} from 'rxjs';
import {BreadcrumbModel} from '../../common/components/breadcrumbs/model/breadcrumbs.model';

@Component({
  selector: 'app-validate-transactions-screen',
  templateUrl: './validate-transactions-screen.component.html',
  styleUrls: ['./validate-transactions-screen.component.scss']
})
export class ValidateTransactionsScreenComponent implements OnInit {
  accountsFormGroup: FormGroup = new FormGroup({});
  allAccounts: AccountModel [] = [];
  allRules: TransactionRuleModel [] = [];
  filteredRules: TransactionRuleModel[] = [];
  creditFilteredAccounts: Observable<AccountModel []>;
  debitFilteredAccounts: Observable<AccountModel []>;
  whichAccounts: 'both' | 'debit' | 'credit' = 'both';
  validateScreenBreadcrumbs: BreadcrumbModel [] = [
    {
      name: 'accounts',
      route: '/'
    },
    {
      name: 'validate-transactions',
      route: '/validate'
    }
  ];

  constructor(private accountsService: AccountsService,
              private rulesService: TransactionRulesService) { }

  get selectedCreditAccount(): AccountModel {
    return this.accountsFormGroup.controls.creditAccount.value;
  }

  get selectedDebitAccount(): AccountModel {
    return this.accountsFormGroup.controls.debitAccount.value;
  }

  ngOnInit(): void {
    this.allAccounts = this.accountsService.getAccounts();
    if (this.allAccounts?.length > 0) {
      this.rulesService.getRules().subscribe(rules => {
        this.allRules = rules;
      });
      this.accountsFormGroup = this.initializeFormGroup();
      this.setAccountsFilters();
      this.filterRules();
    }
  }

  private setAccountsFilters(): void {
    this.creditFilteredAccounts = this.accountsFormGroup.controls.creditAccount.valueChanges.pipe(
      startWith(''),
      map(this.filter),
    );

    this.debitFilteredAccounts = this.accountsFormGroup.controls.debitAccount.valueChanges.pipe(
      startWith(''),
      map(this.filter),
    );
  }

  private filter = (value: string): AccountModel[] => {
    const filterValue = value.trim().toLowerCase();
    return this.allAccounts.filter(account => account.id.toLowerCase().includes(filterValue));
  }

  private initializeFormGroup(existingRule?: TransactionRuleModel): FormGroup {
    return new FormGroup({
      debitAccount: new FormControl(existingRule?.debitAccount || '', [
        accountValidator(this.allAccounts),
        differentValuesValidator('creditAccount')
      ]),
      creditAccount: new FormControl(existingRule?.creditAccount || '' , [
        accountValidator(this.allAccounts),
        differentValuesValidator('debitAccount')
      ]),
    });
  }

  filterRules(): void {
    const creditAccount = this.accountsFormGroup.controls.creditAccount;
    const debitAccount = this.accountsFormGroup.controls.debitAccount;

    combineLatest([
      creditAccount.valueChanges.pipe(startWith('')),
      debitAccount.valueChanges.pipe(startWith(''))
    ]).subscribe(([newCredit, newDebit]) => {
      this.filteredRules = this.allRules.filter((rule) => {
        switch (this.whichAccounts) {
          case 'both':
            return rule.creditAccount === newCredit && rule.debitAccount === newDebit;
            break;
          case 'credit':
            return rule.creditAccount === newCredit;
            break;
          case 'debit':
            return rule.debitAccount === newDebit;
        }
      });
    });
  }

  // TODO buttons group value changed is trigger twiced and first value is always undefined then the actual value is passed
  updateAccountsSelection(newSelection): void {
    if (newSelection) {
      this.whichAccounts = newSelection;
      switch (newSelection) {
        case 'both': {
          this.accountsFormGroup.controls.debitAccount.enable();
          this.accountsFormGroup.controls.creditAccount.enable();
          break;
        }
        case 'credit': {
          this.accountsFormGroup.controls.debitAccount.disable();
          this.accountsFormGroup.controls.creditAccount.enable();
          break;
        }
        case 'debit': {
          this.accountsFormGroup.controls.debitAccount.enable();
          this.accountsFormGroup.controls.creditAccount.disable();
          break;
        }
      }
    }
  }

}
