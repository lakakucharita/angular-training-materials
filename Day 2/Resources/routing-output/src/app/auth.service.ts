import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { MessagesService } from './utilities/messages.service';

@Injectable()
export class AuthService {

  authorized: boolean = false;

  constructor(
    private router: Router,
    private messagesService: MessagesService
  ) { }

  public login() {
    this.authorized = true;

    this.messagesService.clear();
    this.messagesService.add('You are now logged in!');

    this.router.navigate(['/home']);
  }

  public logout() {
    this.authorized = false;

    this.messagesService.clear();
    this.messagesService.add('You\'ve been logged out');

    this.router.navigate(['/home']);
  }
}
