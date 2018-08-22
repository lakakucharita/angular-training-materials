import { Component, OnInit } from '@angular/core';
import { Question } from '../models/question';
import { Answer } from '../models/answer';
import { FormBuilder, FormArray } from '@angular/forms';
import { QuestionsService } from '../utilities/questions.service';
import { MessagesService } from '../utilities/messages.service';
import { Observable, of } from 'rxjs';
import { switchMap } from 'rxjs/operators';
import { ActivatedRoute, ParamMap, Router } from '@angular/router';

@Component({
  selector: 'app-question-details',
  templateUrl: './question-details.component.html',
  styleUrls: ['./question-details.component.scss']
})
export class QuestionDetailsComponent implements OnInit {

  question$: Observable<Question> = null;

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
    private route: ActivatedRoute,
    private router: Router,
    private questionsService: QuestionsService,
    private messagesService: MessagesService
  ) { }

  ngOnInit() {
    this.question$ = this.route.paramMap.pipe(
      switchMap(
        (params: ParamMap) => {
          let questionId = parseInt(params.get('id'));

          if (questionId === 0) {
            return of(new Question());
          } else {
            return this.questionsService.getOne(questionId);
          }
        }
      )
    );

    this.question$.subscribe(response => this.renderForm(response));
  }

  private renderForm(question: Question) {
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

    var newQuestion = new Question();

    this.copyQuestion(inputQuestion, newQuestion);

    // If inputQuestion.id is 0, assume that we're adding a new question
    // otherwise, just update the question with the same ID
    if (inputQuestion.id == 0) {
      this.addQuestion(newQuestion);
    } else {
      this.updateQuestion(newQuestion);
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

  private addQuestion(newQuestion: Question) {
    this.questionsService
      .add(newQuestion)
      .subscribe(
        response => {
          this.messagesService.clear();
          this.messagesService.add(response.message);

          newQuestion.id = response.id;

          this.renderForm(newQuestion);
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

          this.renderForm(newQuestion);
        }
      );
  }

  deleteQuestion(question: Question) {
    if (question.id > 0) {
      this.questionsService
        .delete(question.id)
        .subscribe(
          response => {
            this.messagesService.clear();
            this.messagesService.add(response.message);

            this.router.navigate(['questions']);
          }
        );
    }
  }

}
