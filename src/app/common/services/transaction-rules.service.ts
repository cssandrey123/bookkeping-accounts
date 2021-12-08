import {Injectable} from '@angular/core';
import {TransactionRuleModel} from '../models/transaction-rule.model';
import {BehaviorSubject} from 'rxjs';
import {MOCK_RULES} from '../constants';

@Injectable({
  providedIn: 'root'
})

export class TransactionRulesService {
  private allRules: TransactionRuleModel[] = [];
  rulesChangeEvent: BehaviorSubject<TransactionRuleModel[]> = new BehaviorSubject<TransactionRuleModel[]>([]);

  constructor() {
  }

  getRules(): BehaviorSubject<TransactionRuleModel[]> {
    if (!this.allRules || this.allRules.length === 0) {
      this.allRules = this._getRules();
    }
    this.rulesChangeEvent.next(this.allRules);
    return this.rulesChangeEvent;
  }

  addRule(rule: TransactionRuleModel): void {
    this.allRules.push(rule);
    this._saveRules(this.allRules);
    this.rulesChangeEvent.next(this.allRules);
  }

  editRule(editedRule: TransactionRuleModel): void {
    const ruleIndex = this.allRules.findIndex(rule => rule.id === editedRule.id);
    this.allRules[ruleIndex] = editedRule;
    this._saveRules(this.allRules);
    this.rulesChangeEvent.next(this.allRules);
  }

  deleteRule(rule: TransactionRuleModel): void {
    this.allRules = this.allRules.filter(filteredRule => filteredRule.id !== rule.id);
    this._saveRules(this.allRules);
    this.rulesChangeEvent.next(this.allRules);
  }

  addMockedRules(): void {
    this.allRules = MOCK_RULES;
    this._saveRules(this.allRules);
    this.rulesChangeEvent.next(this.allRules);
  }

  private _saveRules(rules: TransactionRuleModel[]): void {
    localStorage.setItem('transaction_rules', JSON.stringify(rules));
  }

  private _getRules(): TransactionRuleModel[] {
    return JSON.parse(localStorage.getItem('transaction_rules')) || [];
  }
}
