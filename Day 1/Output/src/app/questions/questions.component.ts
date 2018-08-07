import { Component, OnInit } from '@angular/core';

import { MOCK_QUESTIONS } from '../models/mock-questions';
import { Question } from '../models/question';

@Component({
  selector: 'app-questions',
  templateUrl: './questions.component.html',
  styleUrls: ['./questions.component.scss']
})
export class QuestionsComponent implements OnInit {

  questionList: Question[] = [];
  selectedQuestion: Question = null;

  constructor() { }

  ngOnInit() {
    // MOCK_QUESTIONS is read-only, so we copy all the questions to a new list that we can modify
    for (let i = 0; i < MOCK_QUESTIONS.length; i++) {
      var newQuestion = MOCK_QUESTIONS[i];

      this.questionList.push(newQuestion);
    }
  }

  // This method is used in:
  // Click binding - when a user clicks on the "delete" link
  // Event binding - when the details component "emits" the question deleted event
  deleteQuestion(questionToDelete: Question) {
    if (questionToDelete.id > 0) {
      var newQuestions: Question[] = [];
      var oldQuestions = this.questionList;

      for (let i = 0; i < oldQuestions.length; i++) {
        var curQuestion = oldQuestions[i];

        if (curQuestion.id !== questionToDelete.id) {
          newQuestions.push(curQuestion);
        }
      }

      this.questionList = newQuestions;
    }

    if (this.selectedQuestion !== null && questionToDelete.id === this.selectedQuestion.id) {
      this.selectedQuestion = null;
    }
  }

  showNewQuestionForm() {
    this.selectedQuestion = new Question();
  }

  addQuestion(newQuestion: Question) {
    newQuestion.id = this.questionList.length;
    this.questionList.push(newQuestion);
  }
}
