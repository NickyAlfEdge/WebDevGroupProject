'use strict';
const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    surname: String,
    firstname: String,
    email: String,
    password: String,
});

userSchema.pre('save', function(next) {
    this.duplicateEmail(this.email)
        .then((doc) => {
            if (doc) {
                return next(new Error('this email has been registered'));
            } else {
                next();
            }
        }).catch((err) => {
        return next(err);
    });
});

userSchema.virtual('name').get(
    function() {
        return this.firstname + this.surname;
    },
);

userSchema.set('toObject', {getters: true, virtuals: true});

/**
 * whether username duplicate
 * @param email
 */
userSchema.methods.duplicateEmail = function(email) {
    return new Promise((resolve, reject) => {
        User.findOne({email: email})
            .exec()
            .then((doc) => {
                resolve(doc);
            })
            .catch((err) => {
                reject(err);
            });
    });
};

const User = mongoose.model('users', userSchema);

module.exports = User;

