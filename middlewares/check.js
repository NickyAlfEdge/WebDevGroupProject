module.exports = {
    checkAdminLogin: function checkAdminLogin(req, res, next) {
        checkRoleLogin('admin', req, res, next);
    },

    checkIsAdminLogin: function checkAdminLogin(req, res, next) {
        checkIsAdmin(req, res, next);
    },

    checkIsLogin: function checkIsLogin (req, res, next) {
        if (req.session.role == "admin") {
            res.redirect('/admin/pet_list_waiting');
        } else if (req.session.role == "user") {
            res.redirect('/');
        } else {
            next();
        }
    }
};

// eslint-disable-next-line require-jsdoc
function checkRoleLogin(role, req, res, next) {
    if (req.session.role !== role) {
        return res.redirect('/login');
    }
    next();
}

function checkIsAdmin(req, res, next) {
    if (req.session.role == "admin") {
        return res.redirect('/admin/pet_list_waiting');
    } else {
        next();
    }
}
