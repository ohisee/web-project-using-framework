/**
 * App module
 */
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgModule } from '@angular/core';
import { HttpModule, JsonpModule } from '@angular/http';
import { HttpClientModule } from '@angular/common/http';
import { StoreModule } from '@ngrx/store';
import { StoreRouterConnectingModule } from '@ngrx/router-store';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';
import { environment } from '../environments/environment';

import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { SharedModule } from './shared/shared.module';
import { ShoppingListModule } from './shopping-list/shopping-list.module';
import { AuthModule } from './auth/auth.module';
import { AppDefaultRoutingModule } from './app-default-routing.module';
import { CoreModule } from './core/core.module';
// import { shoppingListReducer } from './shopping-list/store/shopping-list.reducers';
import { reducers } from './store/app.reducers';
import { EffectsModule } from '@ngrx/effects';
import { AuthEffects } from './auth/store/auth.effects';
import { PosterDataAuthInterceptor } from './poster-data/poster.interceptor';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule.withServerTransition({appId: 'universal-recipe-app'}),
    BrowserAnimationsModule,
    HttpModule,
    HttpClientModule,
    JsonpModule,
    AppRoutingModule,
    SharedModule,
    ShoppingListModule,
    AuthModule,
    CoreModule, // load core module eagerly
    AppDefaultRoutingModule,
    // StoreModule.forRoot({ shoppingList: shoppingListReducer })
    StoreModule.forRoot(reducers),
    EffectsModule.forRoot([AuthEffects]),
    StoreRouterConnectingModule,
    !environment.production ? StoreDevtoolsModule.instrument() : [] // must be after StoreRouterConnectingModule
  ],
  providers: [
    // {
    //   provide: HTTP_INTERCEPTORS, useClass: PosterDataAuthInterceptor, multi: true
    // }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
