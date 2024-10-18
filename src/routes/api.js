const express = require('express');

const routerAPI = express.Router();

const { getUsersAPI } = require('../controllers/apiController');

routerAPI.get('/', (req, res) => {
    res.send("Hello world with api");
});

routerAPI.get('/abc', (req, res) => {
    //Gồm 2 phần trả ra trạng thái và truyền về data cho client
    res.status(201).json({
        data: "xin chao api dau tien",
    })
});

routerAPI.get('/users', getUsersAPI);


module.exports = routerAPI;