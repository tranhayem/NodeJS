import userService from "../services/userServices"

let handleLogin = async (request, response) => {
    let email = request.body.email;
    let password = request.body.password;

    if (!email || !password) {
        return response.status(500).json({
            errorCode: 1,
            message: 'Vui lòng nhập đầy đủ tài khoản, mật khẩu!'
        })
    }
    let userData = await userService.henleUserLogin(email, password)
    return response.status(200).json({
        errorCode: userData.errorCode,
        errorMessage: userData.errorMessage,
        user: userData.user ? userData.user : {}
    })
}

let handleGetAllUser = async (request, response) => {
    let id = request.query.id;

    if (!id) {
        return response.status(200).json({
            errorCode: 1,
            errorMessage: 'Thiếu tham số đầu vào',
            users: []
        })
    }
    let users = await userService.getAllUsers(id);
    return response.status(200).json({
        errorCode: 0,
        errorMessage: 'Đăng nhập thành công!',
        users
    })
}

let handleCreateNewUser = async (request, response) => {
    let data = request.body.data;
    let message = await userService.createNewUser(data);
    return response.status(200).json(message)
}

let handleUpdateUser = async (request, response) => {
    let data = request.body.data;
    let message = await userService.updateUser(data);
    return response.status(200).json(message)
}

let handleDeleteUser = async (request, response) => {
    if (!request.body.id) {
        return request.status(200).json({
            errorCode: 1,
            errorMessage: 'Thiếu tham số đầu vào'
        })
    }
    let message = await userService.deleteUser(request.body.id);
    return response.status(200).json(message)
}

module.exports = {
    handleLogin: handleLogin,
    handleGetAllUser: handleGetAllUser,
    handleCreateNewUser: handleCreateNewUser,
    handleUpdateUser: handleUpdateUser,
    handleDeleteUser: handleDeleteUser
}