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
        user: userData.user ? userData.user: {}
    })
}

module.exports = {
    handleLogin: handleLogin
}