import {Component, OnDestroy, OnInit} from '@angular/core';
import {TransactionRulesService, TransactionRuleModel, AccountModel, AccountsService} from '../../common';
import {Subscription} from 'rxjs';
import {MatDialog} from '@angular/material/dialog';
import {TransactionRulesModalComponent} from './transaction-rules-modal/transaction-rules-modal.component';
import {Router} from '@angular/router';
import {BreadcrumbModel} from '../../common/components/breadcrumbs/model/breadcrumbs.model';

@Component({
  selector: 'app-transaction-rules-screen',
  templateUrl: './transaction-rules-screen.component.html',
  styleUrls: ['./transaction-rules-screen.component.scss']
})
export class TransactionRulesScreenComponent implements OnInit, OnDestroy {
  transactionRulesBreadcrumbs: BreadcrumbModel[] = [
    {
      name: 'accounts',
      route: '/'
    },
    {
      name: 'transaction-rules',
      route: '/rules'
    }
  ];

  allRules: TransactionRuleModel[] = [];
  allAccounts: AccountModel[] = [];
  rulesEventSubscription: Subscription;

  constructor(private transactionRulesService: TransactionRulesService,
              private modalService: MatDialog,
              private router: Router,
              private accountsService: AccountsService) { }

  ngOnInit(): void {
    this.allAccounts = this.accountsService.getAccounts();
    this.rulesEventSubscription = this.transactionRulesService.getRules().subscribe(rules => {
      //Todo chack why property binding not trigger onChanges in transaction-rules-table
      // if we reasign rules directly
      this.allRules = [];
      this.allRules.push(...rules);
    });
  }

  ngOnDestroy(): void {
    this.rulesEventSubscription.unsubscribe();
  }

  addTransactionRule(): void {
    const modalRef = this.modalService.open(TransactionRulesModalComponent);
    modalRef.afterClosed().subscribe((newRule: TransactionRuleModel) => {
      if (newRule) {
        this.saveRule(newRule);
      }
    });
  }

  saveRule(rule: TransactionRuleModel): void {
    if (this.allRules.length > 0) {
      rule.id = this.allRules[this.allRules.length - 1].id + 1;
    } else {
      rule.id = 1;
    }
    this.transactionRulesService.addRule(rule);
  }

  deleteRule(rule: TransactionRuleModel): void {
    this.transactionRulesService.deleteRule(rule);
  }

  editRule(rule: TransactionRuleModel): void {
    const modalRef = this.modalService.open(TransactionRulesModalComponent, {
      data: rule
    });

    modalRef.afterClosed().subscribe((editedRule: TransactionRuleModel) => {
      if (editedRule) {
        this.transactionRulesService.editRule(editedRule);
      }
    });
  }
}
