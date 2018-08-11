import { Question } from "./question";

export const MOCK_QUESTIONS: Question[] = [
    {
        id: 1,
        text: 'What did it cost?',
        answers: [
            {
                id: 1,
                submittedBy: 'thanos@email.com',
                text: 'Everything'
            }
        ]
    },
    {
        id: 2,
        text: 'Who among the avengers survived?',
        answers: [
            {
                id: 2,
                submittedBy: 'batman@email.com',
                text: 'No one'
            },
            {
                id: 3,
                submittedBy: 'spiderman@email.com',
                text: 'I don\'t feel so good'
            },
            {
                id: 4,
                submittedBy: 'antman@email.com',
                text: 'Hank?! Hank?!!'
            },
            {
                id: 5,
                submittedBy: 'janetvandyne@email.com',
                text: 'I just got back and now I\'m gone again'
            }
        ]
    }
]