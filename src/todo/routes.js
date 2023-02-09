const {Router} = require('express');
const controller = require('./controller');

const router = Router();

router.get('/', controller.getTodos);
router.get('/:id', controller.getTodoById);

module.exports = router;