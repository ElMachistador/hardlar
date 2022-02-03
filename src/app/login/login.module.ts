import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LoginComponent } from './login.component';

import { RouterModule } from '@angular/router';

import { MatButtonModule } from '@angular/material/button'


@NgModule({
  declarations: [
    LoginComponent
  ],
  imports: [
    CommonModule,
    MatButtonModule,
    RouterModule.forChild([{ path: '', component: LoginComponent }])
  ]
})
export class LoginModule { }
