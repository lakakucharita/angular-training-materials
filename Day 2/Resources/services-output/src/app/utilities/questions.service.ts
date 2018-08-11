import { Injectable } from '@angular/core';
import { UtilitiesModule } from './utilities.module';
import { Question } from '../models/question';
import { Observable } from '../../../node_modules/rxjs';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { ApiResponse } from '../models/apiResponse';

@Injectable({
  providedIn: UtilitiesModule
})
export class QuestionsService {

  constructor(
    private http: HttpClient
  ) { }

  public getAll(): Observable<Question[]> {
    return this.http.get<Question[]>('http://localhost:3000/api/questions');
  }

  public add(question: Question): Observable<ApiResponse> {
    return this.http.post<ApiResponse>('http://localhost:3000/api/questions/add', question);
  }

  public update(question: Question): Observable<ApiResponse> {
    return this.http.post<ApiResponse>('http://localhost:3000/api/questions/' + question.id + '/update', question);
  }

  public delete(questionId: number): Observable<ApiResponse> {
    return this.http.post<ApiResponse>('http://localhost:3000/api/questions/' + questionId + '/delete', null);
  }
}
