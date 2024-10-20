const connection = require("../config/database");
const { getAllUsers, getUserById, updateUserById, deleteUserById } = require("../services/CRUDSevice");

const getHomepage = async (req, res) => {
    let results = await getAllUsers();
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
    const userId = req.params.id;

    let user = await getUserById(userId);

    res.render('edit.ejs', { userEdit: user })
}

const postCreateUser = async (req, res) => {

    let { email, name, city } = req.body;

    console.log(">>>email: ", email, ">>>name: ", name, ">>>city: ", city,)

    // connection.query(
    //     `INSERT INTO Users (email , name , city )
    // VALUES (?,?,?)`,
    //     [email, name, city],
    //     function (err, results) {
    //         console.log(results);
    //         res.send('Create user succeed!')
    //     }
    // )
    let [results, fields] = await connection.query(
        `INSERT INTO Users (email , name , city )VALUES (?,?,?)`, [email, name, city]);
    console.log(">>check results: ", results);
    // connection.query(
    //     'select * from Users',
    //     function (err, results, fields) {
    //         console.log(">>results: ", results); //trả về kết quả của câu truy vấn
    //     }
    // )
    //const [results, fields] = await connection.query('select * from Users');
    res.redirect('/');
}

const postUpdateUser = async (req, res) => {

    let { email, name, city, userId } = req.body;

    await updateUserById(email, name, city, userId);

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