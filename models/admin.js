const mongoose = require('mongoose');
const schema = new mongoose.Schema({
    name: {type: String, required: true, max: 100},
    email: String,
    password: String,
});

const Admin = mongoose.model('admins', schema);

module.exports = Admin;

