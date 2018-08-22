import { Component, OnInit } from '@angular/core';

import { Question } from '../models/question';
import { QuestionsService } from '../utilities/questions.service';
import { MessagesService } from '../utilities/messages.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-questions',
  templateUrl: './questions.component.html',
  styleUrls: ['./questions.component.scss']
})
export class QuestionsComponent implements OnInit {

  questionList: Question[] = [];
  selectedQuestion: Question = null;

  constructor(
    private questionsService: QuestionsService,
    private messagesService: MessagesService,
    private router: Router
  ) { }

  ngOnInit() {
    this.reloadQuestions();
  }

  private reloadQuestions() {
    return this.questionsService
      .getAll()
      .subscribe(
        response => {
          this.questionList = response;
        }
      );
  }

  // This method is used in:
  // Click binding - when a user clicks on the "delete" link
  // Event binding - when the details component "emits" the question deleted event
  deleteQuestion(questionToDelete: Question) {
    if (questionToDelete.id > 0) {
      this.questionsService
        .delete(questionToDelete.id)
        .subscribe(
          response => {
            this.messagesService.clear();
            this.messagesService.add(response.message);

            this.reloadQuestions();
          }
        );
    }

    if (this.selectedQuestion !== null && questionToDelete.id === this.selectedQuestion.id) {
      this.selectedQuestion = null;
    }
  }

  showNewQuestionForm() {
    this.selectedQuestion = new Question();
  }
}
