var db = require('./db');


const jwt = require('jsonwebtoken')  ;//  Cần chạy lệnh cài đặt: npm install jsonwebtoken --save
require('dotenv').config(); // su dung thu vien doc file env:   npm install dotenv --save
const chuoi_ky_tu_bi_mat = process.env.TOKEN_SEC_KEY;
const bcrypt = require("bcrypt"); //cài bằng lệnh:  npm install bcrypt  --save 

// khởi tạo khuôn mẫu cho model
const spChema = new db.mongoose.Schema(
    {
        // định nghĩa cấu trúc của đối tượng sản phẩm
        name: {type: String, required: true},
        price: {type: Number, required: true},
        description: {type: String, required: true},
        image: {type: String, require: true},
        id_theloai: {type: db.mongoose.Schema.Types.ObjectId,ref: 'theLoai'}
    },
    {
        collection: 'Products'
    }
);

//nếu dịnh nghĩa về thẻ loại thì có thể viết tiếp ở dưới, không cần tạo mới file

const theloaiSchema = new db.mongoose.Schema(
    {
        name: {type: String, requied:true}
    },
    {
        collection: 'Category'
    }
);

const UserSchema = new db.mongoose.Schema(
    {
        username: {type: String, required: true},
        passwd: {type: String, required: true},
        email: {type: String, required: true},
        role: {type: String, require: true},

    },
    {
        collection: 'Users'
    }
);



let spModel = db.mongoose.model('spModel',spChema);

let theloai = db.mongoose.model('theLoai',theloaiSchema);

let taikhoan = db.mongoose.model('taiKhoan', UserSchema);

UserSchema.methods.generateAuthToken = async function () {


    const user = this
    console.log(user)
    const token = jwt.sign({_id: user._id, username: user.username}, chuoi_ky_tu_bi_mat)
    // user.tokens = user.tokens.concat({token}) // code này dành cho nhiều token, ở demo này dùng 1 token
    user.token = token;
    await user.save()
    return token
 }
 UserSchema.statics.findByCredentials = async (username, passwd) => {


    const user = await taikhoan.findOne({username})
    if (!user) {
        throw new Error({error: 'Không tồn tại user'})
    }
    const isPasswordMatch = await bcrypt.compare(passwd, user.passwd)
    if (!isPasswordMatch) {
        throw new Error({error: 'Sai password'})
    }
    return user
 }
module.exports = {spModel,theloai,taikhoan};