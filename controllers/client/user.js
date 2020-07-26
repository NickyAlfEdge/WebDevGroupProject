const User = require('../../models/user');

/**
 *  list all users
 * @param req request
 * @param res response
 */
function list(req, res) {
    User.find()
        .exec()
        .then((doc) => {
            res.json(doc);
        })
        .catch((err) => {
            res.json(err);
        });
}

/**
 * register new user
 * @param req
 * @param res
 */
function signUp(req, res) {
    const json = req.body;
    if (!validateEmail(json.email)) {
        // illegal email
        return res.json('illegal email');
    }
    if (!json.surname) {
        // lack required arguments
        return res.json('please insert surname');
    }
    if (!json.firstname) {
        // lack required arguments
        return res.json('please insert first name');
    }
    if (!json.password) {
        // lack required arguments
        return res.json('please give password');
    }
    const user = new User(json);
    user.save()
        .then((doc) => {
            doc.password = '';
            req.session.user = doc;
            req.session.save();
            res.json({message: 'Sign up success'});
        }).catch((err) => {
            console.error(err);
            res.status(500).json({message: err.message});
        });
}

/**
 * email validation
 * @param email
 * @return {boolean}
 */
function validateEmail(email) {
    const re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(String(email).toLowerCase());
}

/**
 * user logout function
 * @param req
 * @param res
 */
function logout(req, res) {
    req.session.destroy((err) => {
        if (err) {
            console.error(err);
        }
        res.redirect('/');
    });
}

module.exports = {
    list: list,
    signUp: signUp,
    logout: logout,
};
