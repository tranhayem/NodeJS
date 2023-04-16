import db from "../models";
import bcrypt from "bcryptjs";

const salt = bcrypt.genSaltSync(10);

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
                        userData.user = user;
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

let getAllUsers = (id) => {
    return new Promise(async (resolve, reject) => {
        try {
            let users = '';
            if (id == 0) {
                users = await db.Users.findAll({
                    attributes: {
                        exclude: ['passWord']
                    }
                })
            }
            if (id && id != 0) {
                users = await db.Users.findOne({
                    where: {
                        id: id
                    },
                    attributes: {
                        exclude: ['passWord']
                    }
                })
            }
            resolve(users)
        } catch (error) {
            reject(error)
        }
    })
}

let createNewUser = (data) => {
    return new Promise(async (resolve, reject) => {
        // resolve: giải quyết
        // reject: từ chối
        try {
            // check email is exist
            let isEmail = await checkUserEmail(data.email);
            if (isEmail) {
                resolve({
                    errorCode: 1,
                    errorMessage: 'Email đã tồn tại trong hệ thống, vui lòng nhập 1 email khác!'
                })
            } else {
                let hashPasswordFromBcrypt = await hashUserPassword(data.password);
                await db.Users.create({
                    email: data.email,
                    passWord: hashPasswordFromBcrypt,
                    firstName: data.firstName,
                    lastName: data.lastName,
                    address: data.address,
                    phoneNumber: data.phoneNumber,
                    gender: data.gender === '1' ? true : false,
                    roleId: data.roleId,
                });
                resolve({
                    errorCode: 0,
                    message: 'Thêm tài khoản thành công!'
                });
            }
        } catch (error) {
            reject(error);
        }
    });
}

let hashUserPassword = (password) => {
    return new Promise(async (resolve, reject) => {
        // resolve: giải quyết
        // reject: từ chối
        try {
            let hashPassword = await bcrypt.hashSync(password, salt);
            resolve(hashPassword);
        } catch (error) {
            reject(error);
        }
    });
};

let updateUser = (data) => {
    return new Promise(async (resolve, reject) => {
        try {
            if (!data.id) {
                resolve({
                    errorCode: 2,
                    message: 'Id người dùng không hợp lệ'
                });
            }
            let user = await db.Users.findOne({
                where: { id: data.id },
                raw: false
            })

            if (user) {
                user.email = data.email;
                user.passWord = await hashUserPassword(data.password)
                user.firstName = data.firstName;
                user.lastName = data.lastName;
                user.address = data.address;
                user.phoneNumber = data.phoneNumber;
                user.gender = data.gender;
                user.roleId = data.roleId;

                await user.save();

                resolve({
                    errorCode: 0,
                    message: 'Chỉnh sửa dữ liệu thành công'
                });
            } else {
                resolve({
                    errorCode: 1,
                    message: 'Tài khoản không tồn tại'
                });
            }
        } catch (error) {
            reject(error);
        }
    });
};

let deleteUser = (id) => {
    return new Promise(async (resolve, reject) => {
        let user = await db.Users.findOne({
            where: {
                id: id
            }
        })
        if (!user) {
            resolve({
                errorCode: 2,
                errorMessage: 'Tài khoản không tồn tại trong hệ thống'
            })
        }

        await db.Users.destroy({
            where: {
                id: id
            }
        });

        resolve({
            errorCode: 0,
            message: 'Xóa tài khoản thành công'
        })
    });
}

module.exports = {
    henleUserLogin: henleUserLogin,
    getAllUsers: getAllUsers,
    createNewUser: createNewUser,
    updateUser: updateUser,
    deleteUser: deleteUser
}