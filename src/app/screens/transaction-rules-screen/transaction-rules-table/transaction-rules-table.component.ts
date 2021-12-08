import {AfterViewInit, Component, EventEmitter, Input, OnChanges, OnInit, Output, SimpleChanges, ViewChild} from '@angular/core';
import {TransactionRuleModel} from '../../../common/models/transaction-rule.model';
import {animate, state, style, transition, trigger} from '@angular/animations';
import {MatTable, MatTableDataSource} from '@angular/material/table';
import {TransactionRulesService} from '../../../common';
import {MatPaginator} from '@angular/material/paginator';

@Component({
  selector: 'app-transaction-rules-table',
  templateUrl: './transaction-rules-table.component.html',
  styleUrls: ['./transaction-rules-table.component.scss'],
  animations: [
    trigger('detailExpand', [
      state('collapsed', style({height: '0px', minHeight: '0'})),
      state('expanded', style({height: '*'})),
      transition('expanded <=> collapsed', animate('225ms cubic-bezier(0.4, 0.0, 0.2, 1)')),
    ]),
  ],
})
export class TransactionRulesTableComponent implements OnInit, AfterViewInit {
  @Input()
  set transactionRules(rules: TransactionRuleModel[]) {
    this._transactionRules = rules;
    this.dataSource.data = rules;
  }

  @Output() deleteRuleAction: EventEmitter<TransactionRuleModel> = new EventEmitter<TransactionRuleModel>();
  @Output() editRuleAction: EventEmitter<TransactionRuleModel> = new EventEmitter<TransactionRuleModel>();


  // tslint:disable-next-line:variable-name
  _transactionRules: TransactionRuleModel[];
  displayedColumns = ['id', 'debitAccount', 'creditAccount', 'description'];
  displayedColumnsMapper = {
    id: 'Rule ID',
    debitAccount: 'Debit Account',
    creditAccount: 'Credit Account',
    description: 'Rule Description'
  };
  expendedRule: TransactionRuleModel | null;

  dataSource = new MatTableDataSource<TransactionRuleModel>();

  @ViewChild(MatTable) table: MatTable<TransactionRuleModel>;
  @ViewChild(MatPaginator) paginator: MatPaginator;

  constructor(private transactionRulesSrvc: TransactionRulesService) { }

  ngOnInit(): void {}

  ngAfterViewInit(): void {
    this.dataSource.paginator = this.paginator;
  }

  deleteRule(rule: TransactionRuleModel): void {
    this.deleteRuleAction.emit(rule);
  }

  editRule(rule: TransactionRuleModel): void {
    this.editRuleAction.emit(rule);
  }

  addMockRules(): void {
    this.transactionRulesSrvc.addMockedRules();
  }

}
