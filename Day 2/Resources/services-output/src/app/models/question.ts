import { Answer } from "./answer";

export class Question {
    id: number;
    text: string;
    answers: Answer[]; 

    constructor() {
        this.id = 0;
        this.text = '';
        this.answers = [];
    }
}