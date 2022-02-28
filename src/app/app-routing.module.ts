import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { IsConnectedGuard } from './guard';
import { IsConnectedAdminGuard } from './guard-admin';


const routes: Routes = [
  { path: '', redirectTo: 'home', pathMatch: 'full' },
  {
    path: 'home',
    loadChildren: () => import('./home/home.module').then(m => m.HomeModule)
  },
  {
    path: 'admin',
    canActivate: [IsConnectedAdminGuard],
    loadChildren: () => import('./admin/admin.module').then(m => m.AdminModule)
  },
  {
    path: 'token/:id',
    canActivate: [IsConnectedGuard],
    loadChildren: () => import('./token/token.module').then(m => m.TokenModule)
  },
  {
    path: 'login',
    loadChildren: () => import('./login/login.module').then(m => m.LoginModule)
  },
  {
    path: 'profile',
    canActivate: [IsConnectedGuard],
    loadChildren: () => import('./profile/profile.module').then(m => m.ProfileModule)
  },
  {
    path: 'marketplace',
    loadChildren: () => import('./marketplace/marketplace.module').then(m => m.MarketplaceModule)
  },
  {
    path: 'home1155',
    loadChildren: () => import('./ERC1155/home1155/home1155.module').then(m => m.Home1155Module)
  },
  {
    path: 'admin1155',
    loadChildren: () => import('./ERC1155/admin1155/admin1155.module').then(m => m.Admin1155Module)
  },
  {
    path: 'marketplace1155',
    loadChildren: () => import('./ERC1155/marketplace1155/marketplace1155.module').then(m => m.Marketplace1155Module)
  },
  {
    path: 'login1155',
    loadChildren: () => import('./ERC1155/login1155/login1155.module').then(m => m.Login1155Module)
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
