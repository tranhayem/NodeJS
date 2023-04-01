import express from "express";

let configViewEngine = (application) => {
    application.use(express.static("./src/public"));
    application.set("view engine", "ejs");
    application.set("views", "./src/views");

}

module.exports = configViewEngine;