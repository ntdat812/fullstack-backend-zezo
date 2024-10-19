const express = require('express');


const routerAPI = express.Router();

const { getUsersAPI,
    postCreateUserAPI,
    putUpdateUserAPI,
    deleteRemoveUserAPI,
    postUploadSinggleFileAPI } = require('../controllers/apiController');



routerAPI.get('/users', getUsersAPI);

routerAPI.post('/users', postCreateUserAPI);

routerAPI.put('/users', putUpdateUserAPI);

routerAPI.delete('/users', deleteRemoveUserAPI);

routerAPI.post('/file', postUploadSinggleFileAPI);


module.exports = routerAPI;