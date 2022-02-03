import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TokenComponent } from './token.component';

import { RouterModule } from '@angular/router';



@NgModule({
  declarations: [
    TokenComponent
  ],
  imports: [
    CommonModule,
    RouterModule.forChild([{ path: '', component: TokenComponent }])
  ]
})
export class TokenModule { }
