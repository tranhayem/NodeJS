import express from "express";
import bodyParser from "body-parser";
import viewEngine from "./config/viewEngine";
import initWebRouters from "./route/web";
import connectDB from "./config/connectDB";

require('dotenv').config();

let application = express();
application.use(function (request, response, next) {

    // Website you wish to allow to connect
    response.setHeader('Access-Control-Allow-Origin', process.env.URL_REACT);

    // Request methods you wish to allow
    response.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');

    // Request headers you wish to allow
    response.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type');

    // Set to true if you need the website to include cookies in the requests sent
    // to the API (e.g. in case you use sessions)
    response.setHeader('Access-Control-Allow-Credentials', true);

    // Pass to next layer of middleware
    next();
});

application.use(bodyParser.json());
application.use(bodyParser.urlencoded({ extended: true }));

viewEngine(application);
initWebRouters(application);

connectDB();

let port = process.env.PORT || 2728;
// post=== undefined=> port= 2728

application.listen(port, () => {
    console.log("Backend Nodejs đang chạy trên port: http://localhost:" + port);
})