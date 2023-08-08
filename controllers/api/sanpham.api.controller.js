var md = require('../../models/sanpham.model');
//tạo đối tượng mẫu dữ lieuj trả về
var objReturn = {
    status: 1,
    msg: 'ok'
}

exports.list = async (req, res, next) => {

    let listUser = []

    let dieu_kien_loc = null;


    if (typeof (req.query.name) != 'undefined') {
        dieu_kien_loc = { name: new RegExp('.*'+req.query.name+'.*') };
    }
    try {
        listUser = await md.spModel.find(dieu_kien_loc).populate('id_theloai');

        if (listUser) {
            objReturn.data = listUser;
            objReturn.status = 1;
            objReturn.msg = 'lấy ds thành công';
        } else {
            objReturn.status = 0;
            objReturn.msg = 'không có  dữ liệu'
        }
    } catch (error) {
        objReturn.status = 0;
        objReturn.msg = error.msg;
    }


    res.json(objReturn.data);
}

exports.add = async (req, res, next) => {

    // let listUser = []

    // const addUser = {
    //     username: req.body.username,
    //     passwd: req.body.passwd,
    //     email: req.body.email
    // }
    // listUser = await md.userModel.find();
    // try {

    //     if (addUser) {
    //         objReturn.data = addUser;
    //         objReturn.status = 1;
    //         objReturn.msg = 'Thêm thành công';
    //     } else {
    //         objReturn.status = 0;
    //         objReturn.msg = 'thất bại'
    //     }
    // } catch (error) {
    //     objReturn.status = 0;
    //     objReturn.msg = error.msg;
    // }


    res.json(objReturn);
}

exports.update = (req, res, next) => {


    res.json(objReturn);
}