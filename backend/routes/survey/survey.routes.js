const surveyController = require('../../controllers/survey/survey.controller');

const router = require('express').Router();

router.post('/create', surveyController.createSurvey);
router.get('/viewall', surveyController.getSurvey);
router.post('/update' ,surveyController.updateSurvey);
router.post('/delete' ,surveyController.deleteSurvey);
router.post('/view',surveyController.getSurveyById);
router.post('/viewbyuser',surveyController.getSurveyByUserId);

module.exports = router;