import userService from "../services/userServices"

let handleLogin = async (request, respone) => {
    let email = request.body.email;
    let password = request.body.password;

    if (!email || !password) {
        return respone.status(500).json({
            errCode: 1,
            message: 'Missing inputs parameter!'
        })
    }
    let userData = await userService.henleUserLogin(email, password)
    return respone.status(200).json({
        errCode: userData.errCode,
        errMessage: userData.errMessage,
        user: userData.user ? userData.user: {}
    })
}

module.exports = {
    handleLogin: handleLogin
}