var md = require('../../models/sanpham.model');


exports.listUser = async (req, res, next) => {


    let dieu_kien_loc = null;

    if (typeof (req.query.username) != 'undefined') {
        dieu_kien_loc = { username: req.query.username };
    }

    try {
        let list = await md.taikhoan.find(dieu_kien_loc);
        if (list) {
            return res.status(200).json(list);
        } else {
            return res.status(204).json({ msg: 'Không có dữ liệu' });
        }

    } catch (error) {
        return res.status(500).json({ msg: error.message });
    }
    // res.json( {status: 1, msg: 'Trang danh sách user'});
}


exports.login = async (req, res, next) => {

    try {


        const user = await md.taikhoan
            .findByCredentials(req.body.username, req.body.passwd)
        if (!user) {
            return res.status(401)
                .json({ error: 'Sai thông tin đăng nhập' })
        }
        console.log(user);
        return res.status(200).send({ user })


    } catch (error) {
        console.log(error)
        return res.status(500).json({ msg: error.message })


    }


}


exports.reg = async (req, res, next) => {

    try {
        const user = new md.taikhoan(req.body);
        user.username = req.body.username;
        user.passwd = req.body.passwd;
        user.email = req.body.email;
        user.role = 'User';

        let new_u = await user.save()
        return res.status(201).json({ user: new_u })

    } catch (error) {
        console.log(error)
        return res.status(500).json({ msg: error.message })
    }

    // res.json( {status: 1, msg: 'Trang đăng ký'});
}
exports.update =  async (req, res, next) => {

    
    let msg = ''; //dùng truyền ra view

    //load dữ liệu ds thể loại đưa lên giao diện
    //load thông tin sản phẩm
    let idtk = req.params.idtk;
    let objtk = await myMD.taikhoan.findById(idtk)



    if (req.method == 'POST') {
        //kiểm tra hợp lệ dữ liệu

        //tạo đối tượng model để gán dữ liệu
        let objttk = new myMD.taikhoan();
        objtk.name = req.body.name;

        objtk._id = idtk;

        //ghi CSDL
        try {
            // let new_sp = await objSp.save();
            // console.log(new_sp);
            // msg = 'Đã thêm thành công';

            await myMD.taikhoan.findByIdAndUpdate({ _id: idtk }, objtk);
            msg = 'Đã sửa thành công';

        } catch (error) {
            msg = 'Lỗi ' + error.message();
            console.log(error);
        }
    }

    res.json({ status: 1, msg: 'Trang thông tin' });
}



exports.profile = (req, res, next) => {

    

    res.json({ status: 1, msg: 'Trang thông tin' });
}


exports.logout = async (req, res, next) => {

    res.json({ status: 1, msg: 'Trang đăng xuất' });
}
