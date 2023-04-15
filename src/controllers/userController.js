import userService from "../services/userServices"

let handleLogin = async (request, respone) => {
    let email = request.body.email;
    let password = request.body.password;

    if (!email || !password) {
        return respone.status(500).json({
            errorCode: 1,
            message: 'Vui lòng nhập đầy đủ tài khoản, mật khẩu!'
        })
    }
    let userData = await userService.henleUserLogin(email, password)
    return respone.status(200).json({
        errorCode: userData.errorCode,
        errorMessage: userData.errorMessage,
        user: userData.user ? userData.user : {}
    })
}

let handleGetAllUser = async (request, respone) => {
    let id = request.query.id;

    if (!id) {
        return respone.status(200).json({
            errorCode: 1,
            errorMessage: 'Thiếu tham số đầu vào',
            users: []
        })
    }
    let users = await userService.getAllUsers(id);
    return respone.status(200).json({
        errorCode: 0,
        errorMessage: 'Đăng nhập thành công!',
        users
    })
}

module.exports = {
    handleLogin: handleLogin,
    handleGetAllUser: handleGetAllUser
}