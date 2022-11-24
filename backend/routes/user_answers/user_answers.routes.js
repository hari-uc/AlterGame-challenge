const userAnswerController = require('../../controllers/user_answers/user_answers.controller');

const router = require('express').Router();

router.post('/create', userAnswerController.createUsersAnswers);
router.post('/createBulk', userAnswerController.saveUsersAnswersBulk);
router.post('/viewbysurveyId', userAnswerController.getUsersAnswersBySurveyId);
router.post('/view', userAnswerController.getUsersAnswers);

module.exports = router;
