require('dotenv').config();
var mongoose = require('mongoose');
const dbState = [{
    value: 0,
    label: "disconnected"
},
{
    value: 1,
    label: "connected"
},
{
    value: 2,
    label: "connecting"
},
{
    value: 3,
    label: "disconnecting"
}];


const connection = async () => {
    try {
        //cau hinh ben .env va goi sang
        const options = {
            user: process.env.DB_USER,
            pass: process.env.DB_PASSWORD,
        }
        await mongoose.connect(process.env.DB_HOST, options);

        //kiem tra xem trang thai ket noi the nao va in ra console.log
        const state = Number(mongoose.connection.readyState);
        console.log(dbState.find(f => f.value == state).label, "to db"); // connected to db
    } catch (error) {
        console.log(">>>Error connection DB: ", error);
    }
}
module.exports = connection;

