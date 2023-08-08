var express = require('express');
var router = express.Router();
var homeCtrl = require('../controllers/signin.controller')
var mdw = require('../middleware/user.middleware');


router.get('/', homeCtrl.signin );
router.post('/',homeCtrl.signin);

router.get('/signup', homeCtrl.signup);
router.post('/signup', homeCtrl.signup);



router.get('/logout', mdw.check_login ,homeCtrl.Logout);

module.exports = router;
