import { Component, OnInit } from '@angular/core';
import { MessagesService } from '../messages.service';

@Component({
  selector: 'app-messages',
  templateUrl: './messages.component.html',
  styleUrls: ['./messages.component.scss']
})
export class MessagesComponent implements OnInit {
  messagesService: MessagesService;

  constructor(
    private _messagesService: MessagesService
  ) { 

    this.messagesService = _messagesService;
  }

  ngOnInit() {
  }

}
