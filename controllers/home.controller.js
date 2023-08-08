var myMD = require('../models/sanpham.model');

exports.home =  async (req, res, next) => {

    
    //tạo chức năng lọc dữ liệu trên danh sách
    let dieu_kien_loc = null;


    let listTL = await myMD.theloai.find();


    if (typeof (req.query.id_theloai) != 'undefined') {
        dieu_kien_loc = { id_theloai: req.query.id_theloai };
    }


    //    var list = await myMD.spModel.find( dieu_kien_loc ).sort( { name: 1 } );
    var list = await myMD.spModel.find(dieu_kien_loc).populate('id_theloai');


    //    console.log(list);

    res.render('home/index', { listSP: list, listTL: listTL });
}
exports.user = async (req, res, next) => {
    let dieu_kien_loc = null;

    if (typeof (req.query.username) != 'undefined') {
    dieu_kien_loc = { username: new RegExp('.*'+req.query.username+'.*')  };
    }

    var list = await myMD.taikhoan.find(dieu_kien_loc).sort({ _id: 1 });
    //    var list = await myMD.spModel.find(dieu_kien_loc).populate('id_theloai');
    return res.render('home/user', {listTK: list});
}

exports.delTK = async (req,res, next) => {

    let idtk = req.params.idtk;
    try {
        await myMD.taikhoan.findByIdAndDelete(idtk, req.body);
        return res.redirect('/index/user');
    } catch (error) {
        console.log(error);
    }
    return res.render('/index/user')
}
exports.editTK = async (req,res,next) => {
    let msg = ''; //dùng truyền ra view

    //load dữ liệu ds thể loại đưa lên giao diện
    //load thông tin sản phẩm
    let idtk = req.params.idtk;
    let objTK = await myMD.taikhoan.findById(idtk)



    if (req.method == 'POST') {
        //kiểm tra hợp lệ dữ liệu

        //tạo đối tượng model để gán dữ liệu
        let obj = new myMD.taikhoan();
        obj.username = req.body.username;
        // xử lý mã hóa password
        // B1: Tạo chuỗi mã bí mật 

        // objU.passwd = req.body.passwd;
        obj.email = req.body.email;
        obj.role = req.body.role;
        obj._id = idtk;

        //ghi CSDL
        try {
            // let new_sp = await objSp.save();
            // console.log(new_sp);
            // msg = 'Đã thêm thành công';

            await myMD.taikhoan.findByIdAndUpdate({ _id: idtk }, obj);
            msg = 'Đã sửa thành công';

        } catch (error) {
            msg = 'Lỗi ' + error.message();
            console.log(error);
        }
    }

    res.render('home/editUser',{ msg: msg, objTK: objTK })
}

