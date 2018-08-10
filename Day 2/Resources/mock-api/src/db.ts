import * as loki from 'lokijs';

import { MOCK_QUESTIONS, MOCK_ANSWERS } from './models/mock-questions';

export class InMemoryDatabase {
    private _db: any = null;

    questions: any = null;
    answers: any = null;

    init() {
        this._db = new loki('loki.json');

        this.questions = this._db.addCollection('questions');
        this.questions.insert(MOCK_QUESTIONS);

        this.answers = this._db.addCollection('answers');
        this.answers.insert(MOCK_ANSWERS);
    }
}