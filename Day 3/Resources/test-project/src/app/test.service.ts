import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class TestService {

  constructor() { }

  synchronousTest() : string {
    return 'hello world';
  }

  asynchronousTest() : Observable<string> {
    return of('hello world');
  }
}
