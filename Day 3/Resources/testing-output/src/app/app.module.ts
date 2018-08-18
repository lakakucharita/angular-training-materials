import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';

import { AppComponent } from './app.component';
import { TestService } from './test.service';
import { HighlightDirective } from './highlight.directive';
import { DependencyService } from './dependency.service';

@NgModule({
  declarations: [
    AppComponent,
    HighlightDirective
  ],
  imports: [
    BrowserModule,
    HttpClientModule
  ],
  providers: [
    TestService,
    DependencyService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
