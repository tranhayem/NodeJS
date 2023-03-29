import express from "express";
import homeController from "../controllers/homeController";

let router= express.Router();

let initWebRouters= (application) => {
    router.get('/', homeController.getHomePage);
    router.get('/about', homeController.getAboutPage);
    return application.use("/", router);
}

module.exports= initWebRouters;