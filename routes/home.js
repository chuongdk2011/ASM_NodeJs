var express = require('express');
var router = express.Router();
var homeCtrl = require('../controllers/home.controller')
var mdw = require('../middleware/user.middleware');

router.get('/',mdw.check_login, homeCtrl.home );
router.post('/', homeCtrl.home );
router.get('/user',mdw.check_login, homeCtrl.user );




router.get('/delTK/:idtk', homeCtrl.delTK );
router.delete('/delTK/:idtk', homeCtrl.delTK );


router.get('/editTK/:idtk',homeCtrl.editTK);
router.post('/editTK/:idtk',homeCtrl.editTK);


module.exports = router;
