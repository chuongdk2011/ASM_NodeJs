var express = require('express');
var router = express.Router();
var api_sp = require('../controllers/api/sanpham.api.controller');
var api_u = require('../controllers/api/user.api.controller');


router.get('/sanpham', api_sp.list);

router.post('/sanpham', api_sp.add);

router.put('/sanpham/:id', api_sp.update);

router.get('/users', api_u.listUser); // ds u:  /api/users

router.post('/users/login', api_u.login); // đăng nhập

router.post('/users/reg', api_u.reg); // đăng ký

router.get('/users/profile',api_u.profile); // lấy thông tin user

router.get('/users/logout', api_u.logout); // đăng xuất


module.exports = router;