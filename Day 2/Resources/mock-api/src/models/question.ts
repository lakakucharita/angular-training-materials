import { Answer } from "./answer";

export class QuestionBase {
    id: number;
    text: string;

    constructor() {
        this.id = 0;
        this.text = '';
    }
}

export class Question extends QuestionBase {
    answers: Answer[] | null; 

    constructor() {
        super();
        this.answers = [];
    }
}