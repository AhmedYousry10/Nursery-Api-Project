// Required Modules //
const express = require("express");
const mongoose = require('mongoose');
const morgan = require('morgan');
const cors = require('cors');
require("dotenv").config();
const authorizationMW = require('./MiddleWares/AuthMW');
const authRoute = require('./Route/authRoute');
const childRoute = require("./Route/childRoute");
const teacherRoute = require("./Route/teacherRoute");
const classRoute = require("./Route/classRoute");
const docsRoute = require("./Route/docsRoute");

// Server Intialization //
const server = express();
const port = process.env.PORT || 4000;
const DB_Url = process.env.DB_URL;
// Connecting to DB Mongo //
mongoose.connect(DB_Url).then(()=>{
    console.log("DB is Connected");
    // Server Listen Inialization //
    server.listen(port,()=>{
        console.log(`Server is Listening on Port ${port}...`);
    });

}).catch((error)=>console.log("Error in Connecting to Database" + error));

// Enabling Cors for all routes //
server.use(cors());

// Logging With Morgan MiddleWare //
server.use(morgan(':method :url :status :res[content-length] - :response-time ms'));


// Server Settings //
server.use(express.json());

// Routes // 
server.use(authRoute); /* /login */
server.use(docsRoute);


// server.use(authorizationMW);
server.use(teacherRoute);
server.use(childRoute);
server.use(classRoute);

// Not Found MiddleWare //
server.use((request,response)=>{
    response.status(404).json({message:"Not Found"});
})

// Error MiddleWare //
server.use((error,request,response,next)=>{
    response.status(error.statusCode||500).json({message:error+""});
})