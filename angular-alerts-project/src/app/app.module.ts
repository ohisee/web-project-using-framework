import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';

import { AppComponent } from './app.component';
import { WarningAlertComponent } from './warning-alert/warning-alert.component';
import { SuccessAlertComponent } from './success-alert/success-alert.component';
import { DataBindingComponent } from './data-binding/data-binding.component';
import { DirectivesComponent } from './directives/directives.component';
import { GameControlComponent } from './game-control/game-control.component';
import { EvenComponent } from './game-control/even/even.component';
import { OddComponent } from './game-control/odd/odd.component';
import { GameComponent } from './game/game.component';
import { ActiveUsersComponent } from './user-service/active-users/active-users.component';
import { InactiveUsersComponent } from './user-service/inactive-users/inactive-users.component';
import { UserServiceComponent } from './user-service/user-service.component';

import { CounterService } from './user-service/counter.service';

@NgModule({
  declarations: [
    AppComponent,
    WarningAlertComponent,
    SuccessAlertComponent,
    DataBindingComponent,
    DirectivesComponent,
    GameControlComponent,
    EvenComponent,
    OddComponent,
    GameComponent,
		ActiveUsersComponent,
		InactiveUsersComponent,
		UserServiceComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
