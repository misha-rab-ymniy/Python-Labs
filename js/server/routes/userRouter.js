const Router = require('express');
const router = new Router();
const userController = require('../controllers/userConroller');
const authMiddleware = require('../middleware/authMiddleware');

router.post('/registration', userController.registration);
router.post('/login', userController.login);
router.get('/auth', authMiddleware, userController.check);
router.post('/google', userController.signInGoogle);

module.exports = router;
