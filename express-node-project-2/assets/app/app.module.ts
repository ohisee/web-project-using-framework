import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { AppComponent } from './app.component';
import { HeaderComponent } from './header.component';
import { MessagenerComponent } from './messagener/messagener.component';
import { AuthComponent } from './auth/auth.component';
import { AppRoutingModule } from './app-routing.module';


@NgModule({
	declarations: [
		AppComponent,
		HeaderComponent,
		MessagenerComponent,
		AuthComponent
	],
	imports: [
		BrowserModule,
		HttpModule,
		FormsModule, // ngModel two-ways binding
		AppRoutingModule
	],
	providers: [],
	bootstrap: [AppComponent]
})
export class AppModule { }
