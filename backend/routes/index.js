const router = require('express').Router();
const Authentication = require('../middleware/authentication');


const userRoutes = require('./user/user.routes');
const surveyRoutes = require('./survey/survey.routes');
const questionRoutes = require('./questions/questions.routes');
const userAnswerRoutes = require('./user_answers/user_answers.routes');

router.use('/user', userRoutes);
router.use('/survey', [Authentication.verifyToken], surveyRoutes);
router.use('/question', questionRoutes);
router.use('/useranswer', userAnswerRoutes);
module.exports = router;
