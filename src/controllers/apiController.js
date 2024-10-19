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

const putUpdateUserAPI = async (req, res) => {

    let { email, name, city, userId } = req.body;
    //await updateUserById(email, name, city, userId);
    let user = await User.updateOne({ _id: userId }, { email: email, name: name, city: city }); // tìm thằng có userID truyền vào và  update thằng đó

    //res.send('Update user succeed')
    return res.status(200).json({
        success: true,
        data: user
    });
}

const deleteRemoveUserAPI = async (req, res) => {
    const id = req.body.userId;

    let result = await User.deleteOne({ _id: id });
    //res.send('Update user succeed')
    return res.status(200).json({
        success: true,
        data: result
    });
}




module.exports = {
    getUsersAPI,
    postCreateUserAPI,
    putUpdateUserAPI,
    deleteRemoveUserAPI
}