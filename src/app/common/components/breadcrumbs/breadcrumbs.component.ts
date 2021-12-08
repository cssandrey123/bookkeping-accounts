import {Component, Input, OnInit} from '@angular/core';
import {BreadcrumbModel} from './model/breadcrumbs.model';

@Component({
  selector: 'app-breadcrumbs',
  templateUrl: './breadcrumbs.component.html',
  styleUrls: ['./breadcrumbs.component.scss']
})
export class BreadcrumbsComponent implements OnInit {

  @Input() breadcrumbs: BreadcrumbModel[] = [];

  constructor() { }

  ngOnInit(): void {
  }

}
