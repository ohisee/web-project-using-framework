import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';

import { AppComponent } from './app.component';
import { AppHeaderComponent } from './header.component';
import { MessageListComponent } from './message-list/message-list.component';
import { AppRoutingModule } from './app-routing.module';
import { AuthGuard } from './auth/auth-guard.service';

@NgModule({
  declarations: [
    AppComponent,
    AppHeaderComponent,
    MessageListComponent
  ],
  imports: [
    BrowserModule,
    HttpModule,
    FormsModule,
    AppRoutingModule
  ],
  bootstrap: [
    AppComponent
  ],
  providers: [
    AuthGuard
  ]
})
export class AppModule { }
