import { QuestionBase } from "./question";
import { Answer } from "./answer";

export const MOCK_QUESTIONS: QuestionBase[] = [
    {
        id: 1,
        text: 'What did it cost?'
    },
    {
        id: 2,
        text: 'Who among the avengers survived?'
    }
];

export const MOCK_ANSWERS: Answer[] = [
    {
        id: 1,
        questionId: 1,
        submittedBy: 'thanos@email.com',
        text: 'Everything'
    },
    {
        id: 1,
        questionId: 2,
        submittedBy: 'batman@email.com',
        text: 'No one'
    },
    {
        id: 2,
        questionId: 2,
        submittedBy: 'spiderman@email.com',
        text: 'I don\'t feel so good'
    },
    {
        id: 3,
        questionId: 2,
        submittedBy: 'antman@email.com',
        text: 'Hank?! Hank?!!'
    },
    {
        id: 4,
        questionId: 2,
        submittedBy: 'janetvandyne@email.com',
        text: 'I just got back and now I\'m gone again'
    }
]