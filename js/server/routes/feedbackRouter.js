const Router = require('express');
const router = new Router();
const feedbackController = require('../controllers/feedbackController');
const authMiddleware = require('../middleware/authMiddleware');

router.post('/', authMiddleware, feedbackController.create);
router.get('/', feedbackController.getAll);

module.exports = router;
