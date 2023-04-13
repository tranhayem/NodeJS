import db from "../models";
import bcrypt from "bcryptjs";

let henleUserLogin = (email, password) => {
    return new Promise(async (resolve, reject) => {
        try {
            let userData = {};
            let isEmail = await checkUserEmail(email);
            if (isEmail) {
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
                        userData.errorCode = 0;
                        userData.errorMessage = 'Đăng nhập thành công!';
                        delete user.passWord;
                        userData.user= user;
                    } else {
                        userData.errorCode = 3;
                        userData.errorMessage = 'Sai mật khẩu';
                    }
                } else {
                    userData.errorCode = 2;
                    userData.errorMessage = 'Người dùng không tồn tại';
                }
            } else {
                userData.errorCode = 1;
                userData.errorMessage = 'Email của bạn không tồn tại trong hệ thống, hãy thử lại với email khác!';
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