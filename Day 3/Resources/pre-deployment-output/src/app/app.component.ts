import { Component } from '@angular/core';
import { AuthService } from './auth.service';
import { environment } from '../environments/environment';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'q-and-a';

  authService: AuthService;

  constructor(
    private _authService: AuthService
  ) {
    this.authService = _authService;
    this.title = environment.title;
  }
}
