const {Router} = require('express');
const controller = require('./controller');

const router = Router();

router.get('/', controller.getAllUsers);
router.post('/signup', controller.signup);
router.post('/login',controller.login);

module.exports = router;