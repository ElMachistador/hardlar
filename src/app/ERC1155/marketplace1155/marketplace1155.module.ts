import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { Marketplace1155Component } from '../marketplace1155/marketplace1155.component';
import { ReactiveFormsModule } from '@angular/forms';
import { FormsModule } from '@angular/forms';


import { MatListModule } from '@angular/material/list'

import { GetEtherPipe } from 'src/app/pipes';



@NgModule({
  declarations: [
    Marketplace1155Component,
    GetEtherPipe
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    FormsModule,
    MatListModule,
    RouterModule.forChild([{ path: '', component: Marketplace1155Component }])
  ]
})
export class Marketplace1155Module { }
