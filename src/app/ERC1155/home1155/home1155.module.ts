import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Home1155Component } from './home1155.component';

import { RouterModule } from '@angular/router';



@NgModule({
  declarations: [
    Home1155Component
  ],
  imports: [
    CommonModule,
    RouterModule.forChild([{ path: '', component: Home1155Component }])
  ]
})
export class Home1155Module { }
