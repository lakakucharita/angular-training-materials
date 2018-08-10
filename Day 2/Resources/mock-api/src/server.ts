import * as express from 'express';
import { json } from 'body-parser';
import { InMemoryDatabase } from './db';

import { dbAnswersToListModel, dbAnswerToModel, addAnswerListToQuestion } from './server-helpers';
import { Answer } from './models/answer';

let app = express();
let port = process.env.PORT || 3000;

let inMemoryDb = new InMemoryDatabase();

inMemoryDb.init();

app.use(json());

app.use(function (req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
});

app.listen(port);

console.log('Mock API started: http://localhost:' + port);

// Get all questions
app.get('/api/questions', function (req, res) {
    let questions = [];

    let dbQuestions = inMemoryDb.questions.find();

    for (let i = 0; i < dbQuestions.length; i++) {
        let dbQuestion = dbQuestions[i];
        let answers = inMemoryDb.answers.find({ questionId: parseInt(dbQuestion.id) });

        questions.push({
            id: dbQuestion.id,
            text: dbQuestion.text,
            answers: dbAnswersToListModel(answers)
        });
    }

    res.send(questions);
});

// Get a question
app.get('/api/questions/:id', function (req, res) {
    let questionId = req.params.id;

    let dbQuestions = inMemoryDb.questions.find({ id: parseInt(questionId) });

    if (dbQuestions.length > 0) {
        let dbQuestion = dbQuestions[0];

        let answers = inMemoryDb.answers.find({ questionId: parseInt(dbQuestion.id) });

        let question = {
            id: dbQuestion.id,
            text: dbQuestion.text,
            answers: dbAnswersToListModel(answers)
        };

        res.send(question);
    } else {
        res.status(500);
        res.send({
            message: 'Invalid ID'
        });
    }
});

// Add a question
app.post('/api/questions/add', function (req, res) {
    let newQuestion = req.body;

    let questionId = newQuestion.id = inMemoryDb.questions.find().length + 1;

    inMemoryDb.questions.insert(newQuestion);

    addAnswerListToQuestion(newQuestion, inMemoryDb);

    res.send({
        id: questionId,
        message: 'Question added'
    });
});

// Update a question
app.post('/api/questions/:id/update', function (req, res) {
    let questionId = parseInt(req.params.id);
    let newQuestion = req.body;
    let dbQuestions = inMemoryDb.questions.find({ id: questionId });

    if (dbQuestions.length > 0) {
        dbQuestions[0].text = newQuestion.text;

        inMemoryDb.questions.update(dbQuestions[0]);
        
        let oldDbAnswers = inMemoryDb.answers.find({ questionId: questionId });
        inMemoryDb.answers.remove(oldDbAnswers);

        addAnswerListToQuestion(newQuestion, inMemoryDb);

        res.send({
            message: 'Question updated'
        });
    } else {
        res.status(500);
        res.send({
            message: 'Invalid ID'
        });
    }
});

// Delete a question
app.post('/api/questions/:id/delete', function (req, res) {
    let questionId = parseInt(req.params.id);
    let dbQuestions = inMemoryDb.questions.find({ id: questionId });

    if (dbQuestions.length > 0) {
        inMemoryDb.questions.remove(dbQuestions);
        
        let oldDbAnswers = inMemoryDb.answers.find({ questionId: questionId });
        inMemoryDb.answers.remove(oldDbAnswers);

        res.send({
            id: questionId,
            message: 'Question deleted'
        });
    } else {
        res.status(500);
        res.send({
            message: 'Invalid ID'
        });
    }
});

// Get all of a question's answers
app.get('/api/questions/:id/answers', function (req, res) {
    let dbAnswers = inMemoryDb.answers.find({ questionId: parseInt(req.params.id) });

    if (dbAnswers.length > 0) {
        res.send(dbAnswersToListModel(dbAnswers));
    } else {
        res.status(500);
        res.send({
            message: 'Invalid Question ID'
        });
    }
});

// Get an answer
app.get('/api/answers/:id', function (req, res) {
    let dbAnswers = inMemoryDb.answers.find({ id: parseInt(req.params.id) });

    if (dbAnswers.length > 0) {
        res.send(dbAnswerToModel(dbAnswers[0]));
    } else {
        res.status(500);
        res.send({
            message: 'Invalid Answer ID'
        });
    }
});

// Add an answer
app.post('/api/answers/add', function (req, res) {
    let newAnswer = req.body;

    newAnswer.id = inMemoryDb.answers.find().length + 1;

    inMemoryDb.answers.insert(newAnswer);

    res.send({
        message: 'Answer added'
    });
});

// Update an answer
app.post('/api/answers/:id/update', function (req, res) {
    let dbAnswers = inMemoryDb.answers.find({ id: parseInt(req.params.id) });

    if (dbAnswers.length > 0) {
        let dbAnswer = dbAnswers[0];
        dbAnswer.text = req.body.text;
        dbAnswer.submittedBy = req.body.submittedBy;

        inMemoryDb.answers.update(dbAnswer);

        res.send({
            message: 'Question updated'
        });
    } else {
        res.status(500);
        res.send({
            message: 'Invalid ID'
        });
    }
});

// Delete an answer
app.post('/api/answers/:id/delete', function (req, res) {
    let dbAnswers = inMemoryDb.answers.find({ id: parseInt(req.params.id) });

    if (dbAnswers.length > 0) {
        inMemoryDb.answers.remove(dbAnswers);

        res.send({
            message: 'Answer deleted'
        });
    } else {
        res.status(500);
        res.send({
            message: 'Invalid ID'
        });
    }
});