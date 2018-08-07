import { Component, Input, Output, EventEmitter } from '@angular/core';
import { Question } from '../models/question';
import { Answer } from '../models/answer';

@Component({
  selector: 'app-question-details',
  templateUrl: './question-details.component.html',
  styleUrls: ['./question-details.component.scss']
})
export class QuestionDetailsComponent {

  private _selectedQuestion: Question = null;

  // The selectedQuestion property is now defined by a getter/setter so we can "listen" when it is changed
  @Input()
  set selectedQuestion(question: Question) {
    this._selectedQuestion = question;

    if (question != null) {
      this.inputQuestion = new Question();

      this.copyQuestion(this._selectedQuestion, this.inputQuestion);

      this.inputQuestion.answers.push(new Answer());
    } else {
      this.inputQuestion = null;
    }
  }

  get selectedQuestion(): Question {
    return this._selectedQuestion;
  }

  // These output variables will help the details component "announce" that a question has been added or deleted
  @Output()
  questionDeleted = new EventEmitter<Question>();

  @Output()
  questionAdded = new EventEmitter<Question>();

  inputQuestion: Question = null;

  constructor() { }

  saveDetails() {
    // If inputQuestion.id is 0, assume that we're adding a new question
    // otherwise, just update the question with the same ID
    if (this.inputQuestion.id == 0) {
      var newQuestion = new Question();
      this.copyQuestion(this.inputQuestion, newQuestion);
      this.questionAdded.emit(newQuestion);

      this.selectedQuestion = newQuestion;
    } else {
      this.copyQuestion(this.inputQuestion, this._selectedQuestion);

      this.inputQuestion.answers.push(new Answer());
    }
  }

  private copyQuestion(source: Question, target: Question) {
    target.text = source.text;
    target.id = source.id;
    target.answers = [];

    for (let i = 0; i < source.answers.length; i++) {
      var curSourceAnswer = source.answers[i];
      var curSourceSubmittedBy = curSourceAnswer.submittedBy;
      var curSourceText = curSourceAnswer.text;

      if (curSourceSubmittedBy.length > 0 && curSourceText.length > 0) {
        var curTargetAnswer = new Answer();
        curTargetAnswer.id = curSourceAnswer.id;
        curTargetAnswer.submittedBy = curSourceSubmittedBy;
        curTargetAnswer.text = curSourceText;

        target.answers.push(curTargetAnswer);
      }
    }
  }

  deleteQuestion() {
    this.questionDeleted.emit(this.selectedQuestion);
  }

}
