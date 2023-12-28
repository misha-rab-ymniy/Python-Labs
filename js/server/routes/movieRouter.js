const Router = require('express');
const movieController = require('../controllers/movieController');
const checkRoleMiddleware = require('../middleware/checkRoleMiddleware');

const router = new Router();

router.post('/', checkRoleMiddleware('ADMIN'), movieController.create);
router.get('/', movieController.getAll);
router.get('/:id', movieController.getOne);
router.patch('/:id', checkRoleMiddleware('ADMIN'), movieController.update);
router.delete('/:id', checkRoleMiddleware('ADMIN'), movieController.delete);

module.exports = router;
