import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';

import { AppComponent } from './app.component';
import { EditorHighlightDirective } from './editor-highlight.directive';
import { ServerService } from './server.service';
import { CsrfModule } from './csrf/csrf.module';
import { EditorComponent } from './editor/editor.component';

@NgModule({
  declarations: [
    AppComponent,
    EditorHighlightDirective,
    EditorComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
		CsrfModule
  ],
  providers: [ServerService],
  bootstrap: [AppComponent]
})
export class AppModule { }
