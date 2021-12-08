import {Component, Inject, OnInit} from '@angular/core';
import {AbstractControl, FormControl, FormGroup, ValidationErrors, ValidatorFn, Validators} from '@angular/forms';
import {AccountsService, AccountModel, TransactionRuleModel, accountValidator, differentValuesValidator} from '../../../common';
import {Observable} from 'rxjs';
import {map, startWith} from 'rxjs/operators';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material/dialog';

@Component({
  selector: 'app-transaction-rules-modal',
  templateUrl: './transaction-rules-modal.component.html',
  styleUrls: ['./transaction-rules-modal.component.scss']
})
export class TransactionRulesModalComponent implements OnInit {
  rulesFormGroup: FormGroup = new FormGroup({});
  allAccounts: AccountModel [] = [];
  creditFilteredAccounts: Observable<AccountModel []>;
  debitFilteredAccounts: Observable<AccountModel []>;

  editMode = false;

  constructor(private accountsService: AccountsService,
              private dialogRef: MatDialogRef<TransactionRulesModalComponent>,
              @Inject(MAT_DIALOG_DATA) private existingRule: TransactionRuleModel) { }

  ngOnInit(): void {
    this.editMode = this.existingRule ? true : false;
    this.allAccounts = this.accountsService.getAccounts();
    this.rulesFormGroup = this.initializeFormGroup(this.existingRule);
    this.setAccountsFilters();
  }

  saveRule(): void {
    const newRule: TransactionRuleModel = {
      description: this.rulesFormGroup.controls['description'].value,
      creditAccount: this.rulesFormGroup.controls['creditAccount'].value,
      debitAccount: this.rulesFormGroup.controls['debitAccount'].value
    };

    if (this.editMode) {
      newRule.id = this.existingRule.id;
    }

    this.dialogRef.close(newRule);
  }

  private setAccountsFilters(): void {
    this.creditFilteredAccounts = this.rulesFormGroup.controls['creditAccount'].valueChanges.pipe(
      startWith(''),
      map(this.filter),
    );

    this.debitFilteredAccounts = this.rulesFormGroup.controls['debitAccount'].valueChanges.pipe(
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
        Validators.required,
        accountValidator(this.allAccounts),
        differentValuesValidator('creditAccount')
      ]),
      creditAccount: new FormControl(existingRule?.creditAccount || '' , [
        Validators.required,
        accountValidator(this.allAccounts),
        differentValuesValidator('debitAccount')
      ]),
      description: new FormControl(existingRule?.description || '', Validators.required)
    });
  }

}
