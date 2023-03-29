import db from "../models/index";

let getHomePage = async (request, response) => {
    try {
        let data = await db.User.findAll();
        return response.render('homepage.ejs', {
            data: JSON.stringify(data)
        });
    } catch (e) {
        console.log(e);
    }
}

let getAboutPage = async (request, response) => {
    return response.render('test/about.ejs');
}

module.exports = {
    getHomePage: getHomePage,
    getAboutPage: getAboutPage,
}