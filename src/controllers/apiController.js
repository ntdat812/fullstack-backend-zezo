const User = require("../models/user");
const { uploadSingleFile, uploadMultipleFiles } = require('../services/fileService');

const getUsersAPI = async (req, res) => {
    let results = await User.find({});

    return res.status(200).json({
        success: true,
        data: results
    });
};

const postCreateUserAPI = async (req, res) => {

    let { email, name, city } = req.body;
    //mongoDb
    let user = await User.create({
        email: email,
        name: name,
        city: city,
    })

    return res.status(200).json({
        success: true,
        data: user
    });
};

const putUpdateUserAPI = async (req, res) => {

    let { email, name, city, userId } = req.body;
    //await updateUserById(email, name, city, userId);
    let user = await User.updateOne({ _id: userId }, { email: email, name: name, city: city }); // tìm thằng có userID truyền vào và  update thằng đó

    //res.send('Update user succeed')
    return res.status(200).json({
        success: true,
        data: user
    });
};

const deleteRemoveUserAPI = async (req, res) => {
    const id = req.body.userId;

    let result = await User.deleteOne({ _id: id });
    //res.send('Update user succeed')
    return res.status(200).json({
        success: true,
        data: result
    });
};

const postUploadSinggleFileAPI = async (req, res) => {
    console.log(">>req.files: ", req.files);

    if (!req.files || Object.keys(req.files).length === 0) {
        return res.status(400).send('No files were uploaded.');
    }
    let result = await uploadSingleFile(req.files.image);
    console.log("check result: ", result);

    return res.send("Uplpad single file");
};


const postUploadMultipleFileAPI = async (req, res) => {

    if (!req.files || Object.keys(req.files).length === 0) {
        return res.status(400).send('No files were uploaded.');
    }

    if (Array.isArray(req.files.image)) {
        let result = await uploadMultipleFiles(req.files.image);
        console.log("check result: ", result);
        return res.status(200).json({
            EC: 0,
            data: result
        })
    } else {
        return await postUploadSinggleFileAPI(req, res);
    }
};


module.exports = {
    getUsersAPI,
    postCreateUserAPI,
    putUpdateUserAPI,
    deleteRemoveUserAPI,
    postUploadSinggleFileAPI,
    postUploadMultipleFileAPI
};