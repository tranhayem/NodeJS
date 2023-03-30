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
}

let getAboutPage = async (request, response) => {
    return response.render('test/about.ejs');
}

let getCRUD= async(request, response) => {
    return response.render('crud.ejs');
}

let postCRUD= async(request, response) => {
    let message= await CRUDServices.createNewUser(request.body);
    console.log(message);
    return response.send("post thành công");
}

module.exports = {
    getHomePage: getHomePage,
    getAboutPage: getAboutPage,
    getCRUD: getCRUD,
    postCRUD: postCRUD
}