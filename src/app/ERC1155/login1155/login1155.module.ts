import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Login1155Component } from './login1155.component';

import { RouterModule } from '@angular/router';


@NgModule({
  declarations: [
    Login1155Component
  ],
  imports: [
    CommonModule,
    RouterModule.forChild([{ path: '', component: Login1155Component }])
  ]
})
export class Login1155Module { }
