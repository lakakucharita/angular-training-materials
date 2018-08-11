import { Component, Input, Output, EventEmitter } from '@angular/core';
import { Question } from '../models/question';
import { Answer } from '../models/answer';
import { FormBuilder, FormArray } from '@angular/forms';

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

    this.renderForm();
  }

  get selectedQuestion(): Question {
    return this._selectedQuestion;
  }

  // These output variables will help the details component "announce" that a question has been added or deleted
  @Output()
  questionDeleted = new EventEmitter<Question>();

  @Output()
  questionAdded = new EventEmitter<Question>();

  questionForm = this.fb.group({
    id: [''],
    text: [''],
    answers: this.fb.array([])
  });

  get answers() {
    return this.questionForm.get('answers') as FormArray;
  }

  constructor(private fb: FormBuilder) { }

  private renderForm() {
    let question = this._selectedQuestion;

    if (question != null) {
      this.questionForm.get('id').setValue(question.id);
      this.questionForm.get('text').setValue(question.text);

      while (this.answers.length !== 0) {
        this.answers.removeAt(0);
      }

      for (let i = 0; i < question.answers.length; i++) {
        var answer = question.answers[i];

        this.answers.push(this.fb.group(answer));
      }
      
      this.answers.push(this.fb.group(new Answer()));
    }
  }

  saveDetails() {
    var inputQuestion = this.questionForm.value;

    // If inputQuestion.id is 0, assume that we're adding a new question
    // otherwise, just update the question with the same ID
    if (this.selectedQuestion.id == 0) {
      var newQuestion = new Question();

      this.copyQuestion(inputQuestion, newQuestion);

      this.questionAdded.emit(newQuestion);
    } else {
      this.copyQuestion(inputQuestion, this.selectedQuestion);
      
      this.renderForm();
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
