import db from "../models";
import bcrypt from "bcryptjs";

let henleUserLogin = (email, password) => {
    return new Promise(async (resolve, reject) => {
        try {
            let userData = {};
            let isExist = await checkUserEmail(email);
            if (isExist) {
                let user = await db.Users.findOne({
                    attributes: ['email', 'roleId', 'passWord'],
                    where: {
                        email: email
                    },
                    raw: true
                })
                if (user) {
                    let checkPassWord = await bcrypt.compareSync(password, user.passWord);
                    if (checkPassWord) {
                        userData.errCode = 0;
                        userData.errMessage = 'Đăng nhập thành công!';
                        delete user.passWord;
                        userData.user= user;
                    } else {
                        userData.errCode = 3;
                        userData.errMessage = 'Sai mật khẩu';
                    }
                } else {
                    userData.errCode = 2;
                    userData.errMessage = 'Người dùng không tồn tại';
                }
            } else {
                userData.errCode = 1;
                userData.errMessage = 'Email của bạn không tồn tại trong hệ thống, hãy thử lại với email khác!';
            }
            resolve(userData)
        } catch (error) {
            reject(error)
        }
    })
}

let checkUserEmail = (email) => {
    return new Promise(async (resolve, reject) => {
        try {
            let user = await db.Users.findOne({
                where: {
                    email: email
                }
            })
            if (user) {
                resolve(true)
            } else {
                resolve(false)
            }
        } catch (error) {
            reject(error)
        }
    })
}

module.exports = {
    henleUserLogin: henleUserLogin,

}