var myMD = require('../models/sanpham.model');


exports.signin = async (req, res, next) => {
    let msg = '';
    if (req.method == 'POST') {
        // lấy thông tin dựa vào username
        try {
            let objU = await myMD.taikhoan.findOne({ username: req.body.username });

            console.log(objU);
            if (objU != null) {
                if(objU.passwd == req.body.passwd){
                    // if(objU.passwd == req.body.passwd){
                    // đúng thông tin tài khoản ==> lưu vào session
                    req.session.userLogin = objU; 
                    // chuyển trang về trang quản trị
                    return res.redirect('/sanpham');
                }else{
                    msg = 'Sai password';
                }
            } else {
                msg = 'Không tốn tài user' + req.body.username;

            }

        } catch (error) {

        }


    }
    return res.render('login/signin', { msg: msg });
    
}

exports.signup = async (req, res, next) => {

    // Tạo biến lưu trữ câu thong báo
    let msg = ''; //dùng truyền ra view

    if(req.body.passwd != req.body.passwd2){
        msg = 'Xác nhận password không đúng';
        return res.render('login/signup', {msg:msg});
    }
    //load dữ liệu ds thể loại đưa lên giao diện
    if (req.method == 'POST') {
        //kiểm tra hợp lệ dữ liệu

        //tạo đối tượng model để gán dữ liệu
        let obj = new myMD.taikhoan();
        obj.username = req.body.username;
        obj.passwd = req.body.passwd;

        // objU.passwd = req.body.passwd;
        obj.email = req.body.email;
        obj.role = 'User';
        


        //ghi CSDL

        try {
            let new_sp = await obj.save();
            console.log(new_sp);
            msg = 'Đăng ký thành công!! ';
            return res.redirect('/');

        } catch (error) {
            msg = 'Lỗi ' + error.message;
            console.log(error);
        }
    }
    return res.render('login/signup', { msg, msg });
  
}

exports.Logout = (req, res, next) => {
    if (req.session != null)
        req.session.destroy(function () {
            console.log("Đăng xuất thành công")
            return res.redirect('/');
        });
}


