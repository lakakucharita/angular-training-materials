export class Answer {
    id: number;
    questionId: number;
    text: string;
    submittedBy: string;

    constructor() {
        this.id = 0;
        this.questionId = 0;
        this.text = '';
        this.submittedBy = '';
    }
}