const mongoose = require('mongoose');

const userSechema = new mongoose.Schema({
    email: String,
    name: String,
    city: String,
});

const User = mongoose.model('user', userSechema);

module.exports = User;

