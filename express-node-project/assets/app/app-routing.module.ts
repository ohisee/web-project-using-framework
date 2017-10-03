import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { Routes } from '@angular/router';
import { MessageListComponent } from './message-list/message-list.component';
import { AuthGuard } from './auth/auth-guard.service';

const appRoutes: Routes = [
  {
    path: '',
    redirectTo: '/messages',
    pathMatch: 'full'
  },
  {
    path: 'auth',
    loadChildren: './auth/auth.module#AuthModule'
  },
  {
    path: 'messages',
    component: MessageListComponent
  },
  {
    path: 'observable',
    loadChildren: './app-observer/app-observer.module#AppObserverModule',
    canLoad: [AuthGuard]
  }
];

@NgModule({
  imports: [
    RouterModule.forRoot(appRoutes)
  ],
  exports: [
    RouterModule
  ]
})
export class AppRoutingModule { }