const mongoose = require('mongoose');
mongoose.connect('mongodb://127.0.0.1:27017/Assignment')
    .catch((err) =>{
        console.log("Loi ket noi CSDL");
        console.log(err);
    });
module.exports = {mongoose};

//chu ý : một số trường hợp báo lỗi timeout 10000
// thì thay thế chữ localhosst thành 127.0.0.1