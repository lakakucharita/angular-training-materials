import { Answer } from "./models/answer";
import { Question } from "./models/question";
import { InMemoryDatabase } from "./db";

export function dbAnswersToListModel(dbAnswers: any[]): Answer[] {
    var answers: Answer[] = [];

    for (let i = 0; i < dbAnswers.length; i++) {
        answers.push(dbAnswerToModel(dbAnswers[i]));
    }

    return answers;
}

export function dbAnswerToModel(dbAnswer: any): Answer {
    return {
        id: dbAnswer.id,
        questionId: dbAnswer.questionId,
        text: dbAnswer.text,
        submittedBy: dbAnswer.submittedBy
    }
}

export function addAnswerListToQuestion(newQuestion: Question, inMemoryDb: InMemoryDatabase) {
    if (newQuestion.answers != null) {
        for (let i = 0; i < newQuestion.answers.length; i++) {
            let curAnswer = newQuestion.answers[i];

            let newAnswer: Answer = {
                id: i + 1,
                questionId: newQuestion.id,
                submittedBy: curAnswer.submittedBy,
                text: curAnswer.text
            }

            inMemoryDb.answers.insert(newAnswer);
        }
    }
}