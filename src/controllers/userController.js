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

let handleCreateNewUser = async(request, respone)=> {
    let data= request.body;
    let message= await userService.createNewUser(data);
    return respone.status(200).json(message)
}

let handleEditUser = async(request, respone)=> {
    let data= request.body;
    let message= await userService.editUser(data);
    return respone.status(200).json(message)
}

let handleDeleteUser = async(request, respone)=> {
    if(!request.body.id) {
        return request.status(200).json({
            errorCode: 1,
            errorMessage: 'Thiếu tham số đầu vào'
        })
    }
    let message= await userService.deleteUser(request.body.id);
    return respone.status(200).json(message)
}

module.exports = {
    handleLogin: handleLogin,
    handleGetAllUser: handleGetAllUser,
    handleCreateNewUser: handleCreateNewUser,
    handleEditUser: handleEditUser,
    handleDeleteUser: handleDeleteUser
}