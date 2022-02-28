import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Admin1155Component } from '../admin1155/admin1155.component';

import { RouterModule } from '@angular/router';

import { ReactiveFormsModule } from '@angular/forms';



@NgModule({
  declarations: [
    Admin1155Component
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    RouterModule.forChild([{path:'', component: Admin1155Component}])
  ]
})
export class Admin1155Module { }
