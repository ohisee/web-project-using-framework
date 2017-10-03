/**
 * App module
 */
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgModule } from '@angular/core';
import { HttpModule, JsonpModule } from '@angular/http';

import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { SharedModule } from './shared/shared.module';
import { ShoppingListModule } from './shopping-list/shopping-list.module';
import { AuthModule } from './auth/auth.module';
import { AppDefaultRoutingModule } from './app-default-routing.module';
import { CoreModule } from './core/core.module';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
		BrowserModule,
    BrowserAnimationsModule,
		HttpModule,
		JsonpModule,
		AppRoutingModule,
		SharedModule,
		ShoppingListModule,
		AuthModule,
		CoreModule, // load core module eagerly
		AppDefaultRoutingModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
