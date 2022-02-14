import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TokenComponent } from './token.component';

import { RouterModule } from '@angular/router';

import { ReactiveFormsModule } from '@angular/forms';



@NgModule({
  declarations: [
    TokenComponent
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    RouterModule.forChild([{ path: '', component: TokenComponent }])
  ]
})
export class TokenModule { }
