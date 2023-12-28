const Router = require('express');
const router = new Router();
const userRouter = require('./userRouter');
const articleRouter = require('./articleRouter');
const feedbackRouter = require('./feedbackRouter');
const movieRouter = require('./movieRouter');

router.use('/users', userRouter);
router.use('/articles', articleRouter);
router.use('/feedbacks', feedbackRouter);
router.use('/movies', movieRouter);

module.exports = router;
