import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MarketplaceComponent } from './marketplace.component';

import { RouterModule } from '@angular/router';

import { MatListModule } from '@angular/material/list';



@NgModule({
  declarations: [
    MarketplaceComponent
  ],
  imports: [
    CommonModule,
    MatListModule,
    RouterModule.forChild([{ path: '', component: MarketplaceComponent }])
  ]
})
export class MarketplaceModule { }
