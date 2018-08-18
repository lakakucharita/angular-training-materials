import { Component, OnInit } from '@angular/core';
import { TestService } from './test.service';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title$ : Observable<string>;

  constructor(
    private testService : TestService
  ) {
  }

  ngOnInit() {
    this.title$ = this.testService.asynchronousTest();
  }

  getText(): string {
    return this.testService.synchronousTest();
  }
}
