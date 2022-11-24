const questionController = require('../../controllers/questions/question.controller');

const router = require('express').Router();

router.post('/create', questionController.createQuestion);

module.exports = router;