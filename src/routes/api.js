const express = require('express');


const routerAPI = express.Router();

const { getUsersAPI,
    postCreateUserAPI,
    putUpdateUserAPI,
    deleteRemoveUserAPI,
    postUploadSinggleFileAPI,
    postUploadMultipleFileAPI } = require('../controllers/apiController');



routerAPI.get('/users', getUsersAPI);

routerAPI.post('/users', postCreateUserAPI);

routerAPI.put('/users', putUpdateUserAPI);

routerAPI.delete('/users', deleteRemoveUserAPI);

routerAPI.post('/file', postUploadSinggleFileAPI);

routerAPI.post('/files', postUploadMultipleFileAPI);


module.exports = routerAPI;