import { Injectable } from '@angular/core';
import { UtilitiesModule } from './utilities.module';
import { Question } from '../models/question';
import { Observable, of } from 'rxjs';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { ApiResponse } from '../models/apiResponse';
import { catchError } from '../../../node_modules/rxjs/operators';

@Injectable({
  providedIn: UtilitiesModule
})
export class QuestionsService {

  constructor(
    private http: HttpClient
  ) { }

  public getAll(): Observable<Question[]> {
    return this.http
      .get<Question[]>('http://localhost:3000/api/questions');
  }

  public getOne(questionId: number): Observable<Question> {
    return this.http
      .get<Question>('http://localhost:3000/api/questions/' + questionId);
  }

  public add(question: Question): Observable<ApiResponse> {
    return this.http
      .post<ApiResponse>('http://localhost:3000/api/questions/add', question)
      .pipe(
        catchError(this.handleError)
      );
  }

  public update(question: Question): Observable<ApiResponse> {
    return this.http
      .post<ApiResponse>('http://localhost:3000/api/questions/' + question.id + '/update', question)
      .pipe(
        catchError(this.handleError)
      );
  }

  public delete(questionId: number): Observable<ApiResponse> {
    return this.http
      .post<ApiResponse>('http://localhost:3000/api/questions/' + questionId + '/delete', null)
      .pipe(
        catchError(this.handleError)
      );
  }

  private handleError(error: HttpErrorResponse) : Observable<ApiResponse> {
    if (error.error instanceof ErrorEvent) {
      // A client-side or network error occurred. Handle it accordingly.
      return of({
        message: error.error.message
      });
    } else {
      return of({
        message: 'something unexpected happened'
      });
    }
  };
}
