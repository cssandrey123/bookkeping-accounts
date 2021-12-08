import {NgModule} from '@angular/core';
import { ErrorViewerComponent } from './error-viewer/error-viewer.component';
import {MatInputModule} from '@angular/material/input';
import {CommonModule} from '@angular/common';
import { BreadcrumbsComponent } from './breadcrumbs/breadcrumbs.component';
import {RouterModule} from '@angular/router';

@NgModule({
  declarations: [
    ErrorViewerComponent,
    BreadcrumbsComponent
  ],
  imports: [
    MatInputModule,
    CommonModule,
    RouterModule
  ],
  exports: [
    ErrorViewerComponent,
    BreadcrumbsComponent
  ],
})

export class ComponentsModule {}
