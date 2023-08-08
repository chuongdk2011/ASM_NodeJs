var express = require('express');
var routes = express.Router();
var spController = require('../controllers/sanpham.controller');
var mdw = require('../middleware/user.middleware');
// hiện thị dan sách

var multer = require('multer');
var uploader = multer( { dest: './tmp'} );
routes.get('/',mdw.check_login ,spController.list);

routes.get('/addSp', spController.add);
routes.post('/addSp',uploader.single('image'), spController.add);

routes.get('/delSP/:idsp', spController.delSP);
routes.delete('/delSP/:idsp', spController.delSP);

routes.get('/editSp/:idsp', spController.editSP);
routes.post('/editSp/:idsp', spController.editSP);

routes.get('/theloai',mdw.check_login, spController.theloai);

routes.get('/addTL', spController.addTL);
routes.post('/addTL', spController.addTL);


routes.get('/delTL/:idtl', spController.delTL);
routes.delete('/delTL/:idtl', spController.delTL);


routes.get('/editTL/:idsp', spController.editTL);
routes.post('/editTL/:idsp', spController.editTL);

routes.get('/tang',spController.tang);
routes.get('/giam',spController.giam);



routes.get('/ctsp/:idsp',spController.ctsp);


module.exports = routes;