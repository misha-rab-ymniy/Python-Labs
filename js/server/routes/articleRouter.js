const Router = require('express');
const articleController = require('../controllers/articleController');
const checkRoleMiddleware = require('../middleware/checkRoleMiddleware');

const router = new Router();


router.post('/', checkRoleMiddleware('ADMIN'), articleController.create);
router.get('/', articleController.getAll);
router.get('/:id', articleController.getOne);
router.patch('/:id', checkRoleMiddleware('ADMIN'), articleController.update);
router.delete('/:id', checkRoleMiddleware('ADMIN'), articleController.delete);

module.exports = router;
