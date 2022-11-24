const userController = require('../../controllers/user/user.controller');

const router = require('express').Router();

router.post('/signup', userController.signUp);
router.post('/signin', userController.signIn);

module.exports = router;