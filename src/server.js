require('dotenv').config();
const express = require('express');// commonhjs
const configViewEngine = require('./config/viewEngine');
const webRoutes = require('./routes/web');
const connection = require('./config/database')

//console.log("check", process.env);
const app = express();// app express
const port = process.env.PORT || 8081; // port
const hostname = process.env.HOST_NAME;

// config request.body
app.use(express.json()); // Used to parse JSON bodies 
app.use(express.urlencoded({ extended: true })); //Parse URL-encoded bodies 


//config template engine
configViewEngine(app);

//test connection

//simple query
// connection.query(
//     'select * from Users',
//     function (err, results, fields) {
//         console.log(">>results: ", results); //trả về kết quả của câu truy vấn
//     }
// )


//khai báo route
app.use('/', webRoutes)

//Chạy server
app.listen(port, hostname, () => {
    console.log('Example app listening on port ${port}')
});
//app.listen(3000)