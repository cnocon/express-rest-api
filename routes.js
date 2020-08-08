'use strict';

const express = require('express');
const router = express.Router();
const Question = require('./models').Question;

// Callback  to execute when qID is present
router.param('qID', function(req, res, next, id) {
  Question.findById(id, (err, question) => {
    if (err) return next(err);
    if (!question) {
      const error = new Error(`Question with ID ${id} not found`);
      error.status = 404;
      return next(error);
    }
    req.question = question;
    next();
  });
});

// Callback  to execute when aID is present
router.param('aID', function(req, res, next, id) {
  req.answer = req.question.answers.id(id);
  if (!req.answer) {
    err = new Error(`Answer with id ${id} could not be found.`);
    err.status = 404;
    return next(err);
  }
  next();
});

// GET /questions
// Route for questions collection
router.get('/', (req, res, next) => {
  // Question.deleteMany({}, (err) => {
  //   if (err) return next(err);
  //   next();
  // });
  Question.find({}, null, {sort: {createdAt: -1}}, (err, questions) => {
    if (err) return next(err);
    res.json(questions);
  });
});

// GET /questions/:qID
// Route for a specific question
router.get('/:qID', (req, res) => {
  // We set up middleware to load question onto req object when qID is a param (line 8)
  res.json(req.question);
});

// POST /questions
// Route for creating questions
router.post('/', (req, res) => {
  const question = new Question(req.body);
  question.save((err, question, next) => {
    if (err) return next(err);
    res.status(201);
    res.json(question);
  });
});

// GET /questions/:qID/answers/
// Route for all answers to a question
router.get('/:qID/answers', (req, res, next) => {
  res.json(req.question.answers);
});

// POST /questions/:qID/answers/
// Route for creating (answering) a question
router.post('/:qID/answers', (req, res, next) => {
  req.question.answers.push(req.body);
  req.question.save((err, question) => {
    if (err) return next(err);
    res.status(201);
    res.json(question);
  });
});

// PUT /questions/:qID/answers/:aID
// Edit a specific answer
router.put('/:qID/answers/:aID', (req, res, next) => {
  req.answer.update(req.body, (err, answer) => {
    if (err) return next(err);
    res.json(answer);
  });
});

// DELETE /questions/:qID/answers/:aID
// Delete a specific answer
router.delete('/:qID/answers/:aID', (req, res, next) => {
  req.answer.remove((err, answer) => {
    if (err) return next(err);
    req.question.save((err, question) => {
      if (err) return next(err);
      res.json(question);
    })
  });
});


// DELETE /questions/:qID
// Delete a specific answer
router.delete('/:qID', (req, res, next) => {
  req.question.remove((err, question) => {
    if (err) return next(err);
    res.send("Successfully deleted");
  });
});

// POST /questions/:qID/answers/:aID/vote-up
// POST /questions/:qID/answers/:aID/vote-down
// Vote on a specific answer
router.post('/:qID/answers/:aID/vote-:dir',
(req, res, next) => {
  if (req.params.dir.search(/^(up|down)$/) === -1) {
    const err = new Error("Invalid vote direction parameter");
    err.status = 404;
    next(err);
  } else {
    req.vote = req.params.dir;
    next();
  }
}, 
(req, res, next) => {
  req.answer.vote(req.vote, (err, question) => {
    if (err) return next(err);
    res.json(question);
  });
});

module.exports = router;