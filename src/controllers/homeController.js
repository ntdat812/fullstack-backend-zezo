const connection = require("../config/database");
const { getAllUsers, getUserById,
    updateUserById, deleteUserById } = require("../services/CRUDSevice");

const User = require("../models/user");
const getHomepage = async (req, res) => {
    let results = await User.find({});
    return res.render('home.ejs', { listUsers: results });
}

const getABC = (req, res) => {
    res.send('Check abc')
}

const getNTDat = (req, res) => {
    res.render('sample.ejs')
}

const getCreatePage = (req, res) => {
    res.render('create.ejs')
}

const getUpdatePage = async (req, res) => {
    const userId = req.params.id; //lấy ra id của người dùng được chọn để sửa

    //let user = await getUserById(userId);
    let user = await User.findById(userId).exec(); //tìm kiếm người dùng trong cơ sở dữ liệu và truyền vào biến user

    res.render('edit.ejs', { userEdit: user })// gửi dữ liệu đến trang để hiển thị
}

const postCreateUser = async (req, res) => {

    let { email, name, city } = req.body;
    //mongoDb
    await User.create({
        email: email,
        name: name,
        city: city,
    })

    res.redirect('/');
}

const postUpdateUser = async (req, res) => {

    let { email, name, city, userId } = req.body;


    //await updateUserById(email, name, city, userId);
    await User.updateOne({ _id: userId }, { email: email, name: name, city: city }); // tìm thằng có userID truyền vào và  update thằng đó

    //res.send('Update user succeed')
    res.redirect('/');
}
const postDeleteUser = async (req, res) => {
    const userId = req.params.id;
    let user = await getUserById(userId);

    res.render('delete.ejs', { userDelete: user });
}

const postHandleRemoveUser = async (req, res) => {
    const id = req.body.userId;

    await deleteUserById(id);
    res.redirect('/');
}


module.exports = {
    getHomepage,
    getABC,
    getNTDat,
    postCreateUser,
    getCreatePage,
    getUpdatePage,
    postUpdateUser,
    postDeleteUser,
    postHandleRemoveUser
}