import db from "../models/index";
import CRUDServices from "../services/CRUDServices";

let getHomePage = async (request, response) => {
    try {
        let data = await db.Users.findAll();
        return response.render('homepage.ejs', {
            data: JSON.stringify(data)
        });
    } catch (error) {
        console.log(error);
    }
};

let getAboutPage = async (request, response) => {
    return response.render('test/about.ejs');
};

let getCRUD = async (request, response) => {
    return response.render('crud.ejs');
};

let postCRUD = async (request, response) => {
    let message = await CRUDServices.createNewUser(request.body);
    console.log(message);
    return response.send("post thành công");
};

let displayGetCRUD = async (request, response) => {
    let data = await CRUDServices.getAllUser();
    return response.render('displayCRUD.ejs', {
        data: data
    });
};

let editCRUD = async (request, response) => {
    let id = request.query.id;
    if (id) {
        let userData = await CRUDServices.getUserInfoById(id);
        return response.render('editCRUD.ejs', {
            data: userData
        });
    } else {
        return response.send("Không tìm thấy dữ liệu phù hợp");
    }
};

let putCRUD= async (request, response) => {
    let data = request.body;
    let allUsers= await CRUDServices.updateUserData(data);
    return response.render('displayCRUD.ejs', {
        data: allUsers
    })
};

module.exports = {
    getHomePage: getHomePage,
    getAboutPage: getAboutPage,
    getCRUD: getCRUD,
    postCRUD: postCRUD,
    displayGetCRUD: displayGetCRUD,
    editCRUD: editCRUD,
    putCRUD: putCRUD
}