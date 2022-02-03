import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { IsConnectedGuard } from './guard';


const routes: Routes = [
  { path: '', redirectTo: 'home', pathMatch: 'full' },
  {
    path: 'home',
    loadChildren: () => import('./home/home.module').then(m => m.HomeModule)
  },
  {
    path: 'admin',
    canActivate: [IsConnectedGuard],
    loadChildren: () => import('./admin/admin.module').then(m => m.AdminModule)
  },
  {
    path: 'token',
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
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
