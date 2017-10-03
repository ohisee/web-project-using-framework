import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AppObserverRoutingModule } from './app-observer.routing';
import { AppObserverComponent } from './app-observer.component';

@NgModule({
  declarations: [
    AppObserverComponent
  ],
  imports: [
    CommonModule,
    AppObserverRoutingModule
  ],
  providers: []
})
export class AppObserverModule { }