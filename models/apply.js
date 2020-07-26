const mongoose = require('mongoose');
const Schema = new mongoose.Schema({
    candidate: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'users',
    },
    animal: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'animals',
    },
    telephone: String,
    street: String,
    town: String,
    country: String,
    postcode: String,
    family: String,
    animalAlreadyHave: String,
    reason: String,
    status: {
        type: String,
        enum: ['Pending', 'Approved', 'Rejected'],
    },
    createTime: {type: Date, default: Date.now()},
});

const Apply = mongoose.model('applys', Schema);

module.exports = Apply;
