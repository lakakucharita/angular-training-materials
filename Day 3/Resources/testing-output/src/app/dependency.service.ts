import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';

@Injectable()
export class DependencyService {

  constructor() { }

  thisIsADependency() : Observable<string> {
    return of('dependency result');
  }
}
