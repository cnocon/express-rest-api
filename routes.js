'use strict';

const express = require('express');
const router = express.Router();

// GET /questions
// Route for questions collection
router.get('/', (req, res) => {
  res.json({response: "You sent me a GET request"});
});

// POST /questions
// Route for creating questions
router.post('/', (req, res) => {
  res.json({
    response: "You sent me a POST request",
    body: req.body
  });
});

// GET /questions/:qID
// Route for a specific question
router.get('/:qID', (req, res) => {
  res.json({
    response: "You sent a GET request for question id " + req.params.qID
  });
});

// GET /questions/:qID/answers/
// Route for all answers to a question
router.get('/:qID/answers', (req, res) => {
  res.json({
    response: "You sent a POST request to :qID/answers",
    questionId: req.params.qID,
    body: req.body
  });
});

// POST /questions/:qID/answers/
// Route for creating (answering) a question
router.post('/:qID/answers', (req, res) => {
  res.json({
    response: "You sent a POST request to :qID/answers",
    questionId: req.params.qID,
    body: req.body
  });
});

// PUT /questions/:qID/answers/:aID
// Edit a specific answer
router.put('/:qID/answers/:aID', (req, res) => {
  res.json({
    response: "You sent a PUT request to :qID/answers/:aID",
    questionId: req.params.qID,
    answerId: req.params.aID,
    body: req.body
  });
});

// DELETE /questions/:qID/answers/:aID
// Delete a specific answer
router.delete('/:qID/answers/:aID', (req, res) => {
  res.json({
    response: "You sent a DELETE request to :qID/answers/:aID",
    questionId: req.params.qID,
    answerId: req.params.aID
  });
});

// POST /questions/:qID/answers/:aID/vote-up
// POST /questions/:qID/answers/:aID/vote-down
// Vote on a specific answer
router.post('/:qID/answers/:aID/vote-:dir', (req, res) => {
  res.json({
    response: "You sent a POST request to /vote-" + req.params.dir,
    questionId: req.params.qID,
    answerId: req.params.aID,
    vote: req.params.dir
  });
});



module.exports = router;