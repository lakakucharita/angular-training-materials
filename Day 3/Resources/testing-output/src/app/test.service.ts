import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { DependencyService } from './dependency.service';

@Injectable()
export class TestService {

  constructor(
    private dependencyService : DependencyService
  ) { }

  synchronousTest() : string {
    return 'hello world';
  }

  asynchronousTest() : Observable<string> {
    return this.dependencyService.thisIsADependency();
  }
}
