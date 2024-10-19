const mongoose = require('mongoose');

const customerSechema = new mongoose.Schema(
    {
        name: {
            type: String,
            require: true, // không được để trống
        },
        address: String,
        phone: String,
        email: String,
        image: String,
        description: String,
    },
    { timestamps: true } // lưu thông tin thời gian thêm mới và thời gian cập nhật dữ liệu
);

const Customer = mongoose.model('customer', customerSechema);

module.exports = Customer;
