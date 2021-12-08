import {NgModule} from '@angular/core';
import {LandingScreenComponent} from './landing-screen.component';
import {CommonModule} from '@angular/common';
import {RouterModule} from '@angular/router';

@NgModule({
  declarations: [
    LandingScreenComponent
  ],
  imports: [
    CommonModule,
    RouterModule
  ],
  exports: [
    LandingScreenComponent
  ]
})

export class LandingScreenModule {}
