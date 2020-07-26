const User = require('../../models/user');
const Admin = require('../../models/admin');
const mongoose = require('mongoose');

/**
 *
 * @param req
 * @param res
 */
const login = function(req, res) {
    const email = req.body.email;
    const password = req.body.password;
    const role = req.body.role;
    let checkInformation;
    if (role === 'user') {
        checkInformation = User.findOne({email: email}).exec();
    } else if (role === 'admin') {
        checkInformation = Admin.findOne({email: email}).exec();
    }
    checkInformation.then(function(result) {
        const person = result;
        if (person != null && password === person.password) {
            req.session.userId = person.password
            req.session.name = person.name;
            req.session.role = role;
            person.password = '';
            req.session.user = person;
            req.session.save(function(result) {
                res.setHeader('Content-Type', 'application/json');
                res.send(JSON.stringify(req.session));
            });
        } else {
            res.setHeader('Content-Type', 'application/json');
            res.send(JSON.stringify(req.session));
        }
    });
};

module.exports = {
    login: login,
};
