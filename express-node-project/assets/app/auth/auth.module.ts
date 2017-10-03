import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { AuthenticationComponent } from './authentication.component';
import { SigninComponent } from './signin.component';
import { AuthRoutingModule } from './auth.routing';
import { AuthService } from './auth.service';
import { DataStorageService } from './data-storage.service';


@NgModule({
  declarations: [
    AuthenticationComponent,
    SigninComponent,
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    AuthRoutingModule
  ],
  providers: [
    AuthService,
    DataStorageService
  ]
})
export class AuthModule { }