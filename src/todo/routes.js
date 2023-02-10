const {Router} = require('express');
const controller = require('./controller');

const router = Router();

router.get('/', controller.getTodos);
router.post('/', controller.createTodo);
router.get('/:id', controller.getTodoById);
router.delete('/:id', controller.deleteTodo);
router.put('/:id', controller.updateTodo);

module.exports = router;