import bcrypt from "bcryptjs";
import db from "../models";

const salt = bcrypt.genSaltSync(10);

let createNewUser = async (data) => {
    return new Promise(async (resolve, reject) => {
        // resolve: giải quyết
        // reject: từ chối
        try {
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
            resolve('Thêm thông tin thành công!');
        } catch (error) {
            reject(error);
        }
    });
};

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

let getAllUser = () => {
    return new Promise(async (resolve, reject) => {
        try {
            let user = await db.Users.findAll({
                raw: true,
            });
            resolve(user);
        } catch (error) {
            reject(error);
        }
    });
};

let getUserInfoById = (id) => {
    return new Promise(async (resolve, reject) => {
        try {
            let user = await db.Users.findOne({
                where: { id: id },
                raw: true
            })
            if (user) {
                resolve(user);
            } else {
                resolve({});
            }
        } catch (error) {
            reject(error);
        }
    })
};

let updateUserData = (data) => {
    return new Promise(async (resolve, reject) => {
        try {
            let user = await db.Users.findOne({
                where: { id: data.id }
            })

            if (user) {
                user.email = data.email;
                user.passWord = data.passWord;
                user.firstName = data.firstName;
                user.lastName = data.lastName;
                user.address = data.address;
                user.phoneNumber = data.phoneNumber;
                user.gender = data.gender;
                user.roleId = data.roleId;

                await user.save();
                let allUsers = await db.Users.findAll();
                resolve(allUsers);
            } else {
                resolve();
            }
        } catch (error) {
            reject(error);
        }
    });
};

let deleteUserById = (id) => {
    return new Promise(async (resolve, reject) => {
        try {
            let user = await db.Users.findOne({
                where: { id: id }
            })
            if (user) {
                await user.destroy();
            }

            resolve();
        } catch (error) {
            reject(error);
        }
    });
};

module.exports = {
    createNewUser: createNewUser,
    getAllUser: getAllUser,
    getUserInfoById: getUserInfoById,
    updateUserData: updateUserData,
    deleteUserById: deleteUserById
};