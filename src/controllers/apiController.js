const User = require("../models/user");

const getUsersAPI = async (req, res) => {
    let results = await User.find({});

    return res.status(200).json({
        success: true,
        data: results
    });
}


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
}

module.exports = {
    getUsersAPI,
    postCreateUserAPI,

}