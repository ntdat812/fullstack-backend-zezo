require('dotenv').config();
const express = require('express');// commonhjs
const configViewEngine = require('./config/viewEngine');
const webRoutes = require('./routes/web');
const apiRoutes = require('./routes/api');

const connection = require('./config/database');

//console.log("check", process.env);
const app = express();// app express
const port = process.env.PORT || 8081; // port
const hostname = process.env.HOST_NAME;


// config request.body
app.use(express.json()); // Used to parse JSON bodies 
app.use(express.urlencoded({ extended: true })); //Parse URL-encoded bodies 


//config template engine
configViewEngine(app);

//khai báo route
app.use('/', webRoutes);
app.use('/v1/api/', apiRoutes);


//test connection
//self running funtion
(async () => {
    await connection();
    //Chạy server
    app.listen(port, hostname, () => {
        console.log(`Backend zero app listening on port ${port}`)
    });
})()




//app.listen(3000)