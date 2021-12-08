import {AbstractControl, ValidationErrors, ValidatorFn} from '@angular/forms';
import {AccountModel} from '../models/account.model';

export function differentValuesValidator(firstControlName: string): ValidatorFn {
  return (secondControl: AbstractControl): ValidationErrors | null => {
    if (!secondControl.parent?.get(firstControlName)){
      return null;
    }
    const firstControl = secondControl.parent.get(firstControlName);

    if (firstControl.disabled) {
      return null;
    }

    let isDifferent = true;
    if (firstControl?.value !== '' && secondControl?.value !== '' && firstControl?.value === secondControl?.value) {
      isDifferent = false;
    }

    return !isDifferent ? {differentAccount: false} : null;
  };
}

export function accountValidator(allAccounts: AccountModel[]): ValidatorFn {
  return (control: AbstractControl): ValidationErrors | null => {
    const isIn = allAccounts.some(account => account.id === control.value);
    return !isIn ? {invalidAccount: true} : null;
  };
}
