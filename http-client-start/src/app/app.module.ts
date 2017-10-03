import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';

import { AppComponent } from './app.component';
import { PosterDataService } from './services/poster-data.service';
import { NutritionResultListComponent } from './nutrition-result-list/nutrition-result-list.component';
import { NutritionSearchboxViewComponent } from './nutrition-searchbox-view/nutrition-searchbox-view.component';
import { SafeHtmlPipe } from './pipes/safe-html.pipe';
import { AuthInterceptor } from './services/auth.interceptor';
import { HttpResponseInterceptor } from './services/http-response.interceptor';
import { NutritionItemComponent } from './nutrition-result-list/nutrition-item/nutrition-item.component';
import { NutritionCommonItemComponent } from './nutrition-result-list/nutrition-item/nutrition-common-item.component';

@NgModule({
  declarations: [
    AppComponent,
    NutritionResultListComponent,
    NutritionSearchboxViewComponent,
    NutritionItemComponent,
    NutritionCommonItemComponent,
    SafeHtmlPipe
  ],
  imports: [
    BrowserModule,
    HttpClientModule
  ],
  providers: [
    PosterDataService,
    {
      provide: HTTP_INTERCEPTORS, useClass: AuthInterceptor, multi: true
    },
    {
      provide: HTTP_INTERCEPTORS, useClass: HttpResponseInterceptor, multi: true
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
