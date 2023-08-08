var myMD = require('../models/sanpham.model');
var fs = require ('fs');

exports.add = async (req, res, next) => {

    // Tạo biến lưu trữ câu thong báo

    let msg = ''; //dùng truyền ra view

    //load dữ liệu ds thể loại đưa lên giao diện

    let listTL = await myMD.theloai.find();


    if (req.method == 'POST') {
        //kiểm tra hợp lệ dữ liệu

        //tạo đối tượng model để gán dữ liệu
        let objSp = new myMD.spModel();
        objSp.name = req.body.name;
        objSp.price = req.body.price;
        objSp.description = req.body.description;
        objSp.ngayMua = req.body.ngayMua;
        objSp.image = '/uploads/'+ req.file.originalname;
        objSp.id_theloai = req.body.theloai //thêm ID thể loại

        //ghi CSDL

        try {
            fs.renameSync(req.file.path,  './public/uploads/' +  req.file.originalname  );
            let new_sp = await objSp.save();
            console.log(new_sp);
            msg = 'Đã thêm thành công';


        } catch (error) {
            msg = 'Lỗi ' + error.message();
            console.log(error);
        }
    }
    res.render('sanpham/addSp', { msg: msg, listTLadd: listTL });
}

exports.list = async (req, res, next) => {

    //tạo chức năng lọc dữ liệu trên danh sách
    let dieu_kien_loc = null;

    let listTL = await myMD.theloai.find();

    if (typeof (req.query.id_theloai) != 'undefined') {
        dieu_kien_loc = { id_theloai: req.query.id_theloai };
    }

    //    var list = await myMD.spModel.find( dieu_kien_loc ).sort( { name: 1 } );
    var list = await myMD.spModel.find(dieu_kien_loc).populate('id_theloai');

    //    console.log(list);

    res.render('sanpham/listSp', { listSP: list, listTL: listTL });

}

exports.theloai = async (req, res, next) => {


    //tạo chức năng lọc dữ liệu trên danh sách
    let dieu_kien_loc = null;

    if (typeof (req.query.name) != 'undefined') {
        dieu_kien_loc = { price: req.query.name };
    }

    var list = await myMD.theloai.find(dieu_kien_loc).sort({ _id: 1 });
    //    var list = await myMD.spModel.find(dieu_kien_loc).populate('id_theloai');

    res.render('sanpham/theloai', { listTL: list });
}

exports.addTL = async (req, res, next) => {
    // Tạo biến lưu trữ câu thong báo

    let msg = ''; //dùng truyền ra view

    //load dữ liệu ds thể loại đưa lên giao diện

    if (req.method == 'POST') {
        //kiểm tra hợp lệ dữ liệu

        //tạo đối tượng model để gán dữ liệu
        let obj = new myMD.theloai();
        obj.name = req.body.name;
        //ghi CSDL
        try {
            let new_sp = await obj.save();
            console.log(new_sp);
            msg = 'Đã thêm thành công';


        } catch (error) {
            msg = 'Lỗi ' + error.message();
            console.log(error);
        }
    }

    res.render('sanpham/addTL', { msg: msg });
}

exports.editSP = async (req, res, next) => {
    let msg = ''; //dùng truyền ra view

    //load dữ liệu ds thể loại đưa lên giao diện

    let listTL = await myMD.theloai.find();

    //load thông tin sản phẩm
    let idsp = req.params.idsp;
    let objSp = await myMD.spModel.findById(idsp)



    if (req.method == 'POST') {
        //kiểm tra hợp lệ dữ liệu

        //tạo đối tượng model để gán dữ liệu
        let objSp = new myMD.spModel();
        objSp.name = req.body.name;
        objSp.price = req.body.price;
        objSp.description = req.body.description;
        objSp.id_theloai = req.body.theloai //thêm ID thể loại

        objSp._id = idsp;

        //ghi CSDL
        try {
            // let new_sp = await objSp.save();
            // console.log(new_sp);
            // msg = 'Đã thêm thành công';

            await myMD.spModel.findByIdAndUpdate({ _id: idsp }, objSp);
            msg = 'Đã sửa thành công';

        } catch (error) {
            msg = 'Lỗi ' + error.message();
            console.log(error);
        }
    }

    res.render('sanpham/editSp', { msg: msg, listTLup: listTL, objSP: objSp });
}

exports.ctsp = async (req, res, next) => {

    //load thông tin sản phẩm
    let idsp = req.params.idsp;
    let objSp = await myMD.spModel.findById(idsp);
    let listTL = await myMD.theloai.findById(objSp.id_theloai);


    res.render('sanpham/chitietsp', { objSP: objSp, listTL: listTL });
}
exports.editTL = async (req, res, next) => {
    let msg = ''; //dùng truyền ra view

    //load dữ liệu ds thể loại đưa lên giao diện
    //load thông tin sản phẩm
    let idsp = req.params.idsp;
    let objTL = await myMD.theloai.findById(idsp)



    if (req.method == 'POST') {
        //kiểm tra hợp lệ dữ liệu

        //tạo đối tượng model để gán dữ liệu
        let objTL = new myMD.theloai();
        objTL.name = req.body.name;

        objTL._id = idsp;

        //ghi CSDL
        try {
            // let new_sp = await objSp.save();
            // console.log(new_sp);
            // msg = 'Đã thêm thành công';

            await myMD.spModel.findByIdAndUpdate({ _id: idsp }, objTL);
            msg = 'Đã sửa thành công';

        } catch (error) {
            msg = 'Lỗi ' + error.message();
            console.log(error);
        }
    }

    res.render('sanpham/editTL', { msg: msg, objTL: objTL });
}

exports.tang = async (req, res, next) => {

    //tạo chức năng lọc dữ liệu trên danh sách
    let dieu_kien_loc = null;


    let listTL = await myMD.spModel.find();


    if (typeof (req.query.price) != 'undefined') {
        dieu_kien_loc = { price: req.query.price };
    }


    //    var list = await myMD.spModel.find( dieu_kien_loc ).sort( { name: 1 } );
    var list = await myMD.spModel.find().sort({price: 1}).populate('id_theloai');

    //    console.log(list);
    res.render('sanpham/listSp', { listSP: list, listTL: listTL });
}

exports.giam = async (req, res, next) => {

    //tạo chức năng lọc dữ liệu trên danh sách
    let dieu_kien_loc = null;


    let listTL = await myMD.theloai.find();


    if (typeof (req.query.id_theloai) != 'undefined') {
        dieu_kien_loc = { id_theloai: req.query.id_theloai };
    }


    //    var list = await myMD.spModel.find( dieu_kien_loc ).sort( { name: 1 } );
    var list = await myMD.spModel.find().sort({price: -1}).populate('id_theloai');

    //    console.log(list);
    res.render('sanpham/listSp', { listSP: list, listTL: listTL });
}

exports.delSP = async (req,res, next) => {

    let idsp = req.params.idsp;
    try {

        await myMD.spModel.findByIdAndDelete({ _id: idsp }, req.body);
        return res.redirect('/sanpham');
    } catch (error) {
        console.log(error);
    }
    


   return res.render('sanpham/listSP')
}
exports.delTL = async (req,res, next) => {

    let idtl = req.params.idtl;
    try {

        await myMD.theloai.findByIdAndDelete(idtl, req.body);
        return res.redirect('/sanpham/theloai');
    } catch (error) {
        console.log(error);
    }
    


    return res.render('sanpham/theloai')
}



