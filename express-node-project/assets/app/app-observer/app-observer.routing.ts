import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AppObserverComponent } from './app-observer.component';

const appObserverRoutes: Routes = [
  {
    path: '',
    pathMatch: 'full',
    component: AppObserverComponent
  }
];

@NgModule({
  imports: [
    RouterModule.forChild(appObserverRoutes)
  ],
  exports: [
    RouterModule
  ]
})
export class AppObserverRoutingModule { }