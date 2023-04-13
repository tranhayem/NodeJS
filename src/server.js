import express from "express";
import bodyParser from "body-parser";
import viewEngine from "./config/viewEngine";
import initWebRouters from "./route/web";
import connectDB from "./config/connectDB";
require('dotenv').config();

let application = express();

application.use(bodyParser.json());
application.use(bodyParser.urlencoded({ extended: true }));

viewEngine(application);
initWebRouters(application);

connectDB();

let port = process.env.PORT || 3003;
// post=== undefined=> port= 3003

application.listen(port, () => {
    console.log("Backend Nodejs đang chạy trên port: http://localhost:" + port);
})