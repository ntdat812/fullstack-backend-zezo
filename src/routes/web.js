const express = require('express');
const {
    getHomepage,
    getABC,
    getNTDat,
    postCreateUser,
    getCreatePage,
    getUpdatePage,
    postUpdateUser,
    postDeleteUser,
    postHandleRemoveUser } = require('../controllers/homeController');
const router = express.Router();

router.get('/', getHomepage);

router.get('/abc', getABC);

router.get('/ntdat', getNTDat);

router.get('/create', getCreatePage);

router.get('/update/:id', getUpdatePage); // lấy ra thông tin người dùng cần sửa đổi

router.post('/create-user', postCreateUser);

router.post('/update-user', postUpdateUser);

router.post('/delete-user/:id', postDeleteUser);
router.post('/delete-user', postHandleRemoveUser);


module.exports = router;