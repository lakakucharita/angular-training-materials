import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { HighlightDirective } from './highlight.directive';
import { MessagesComponent } from './messages/messages.component';
import { MessagesService } from './messages.service';

@NgModule({
  imports: [
    CommonModule,
    HttpClientModule
  ],
  declarations: [HighlightDirective, MessagesComponent],
  providers: [
    MessagesService
  ],
  exports: [
    HighlightDirective,
    MessagesComponent
  ]
})
export class UtilitiesModule { }
