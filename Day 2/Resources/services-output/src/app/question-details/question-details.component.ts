import { Component, Input, Output, EventEmitter } from '@angular/core';
import { Question } from '../models/question';
import { Answer } from '../models/answer';
import { FormBuilder, FormArray } from '@angular/forms';
import { QuestionsService } from '../utilities/questions.service';
import { MessagesService } from '../utilities/messages.service';

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
  questionsChanged = new EventEmitter();

  questionForm = this.fb.group({
    id: [''],
    text: [''],
    answers: this.fb.array([])
  });

  get answers() {
    return this.questionForm.get('answers') as FormArray;
  }

  constructor(
    private fb: FormBuilder,  
    private questionsService: QuestionsService,
    private messagesService: MessagesService
  ) { }

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
      this.addQuestion(inputQuestion);
    } else {
      this.updateQuestion(inputQuestion);
    }

  }

  private addQuestion(newQuestion: Question) {
    this.questionsService
      .add(newQuestion)
      .subscribe(
        response => {
          this.messagesService.clear();
          this.messagesService.add(response.message);

          this.questionsChanged.emit();
        }
      );
  }

  private updateQuestion(newQuestion: Question) {
    this.questionsService
      .update(newQuestion)
      .subscribe(
        response => {
          this.messagesService.clear();
          this.messagesService.add(response.message);

          this.questionsChanged.emit();
        }
      );
  }

  deleteQuestion() {
    if (this.selectedQuestion.id > 0) {
      this.questionsService
        .delete(this.selectedQuestion.id)
        .subscribe(
          response => {
            this.messagesService.clear();
            this.messagesService.add(response.message);

            this.questionsChanged.emit();
          }
        );
    }
  }

}
