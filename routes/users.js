const express = require('express');
const router = express.Router();
const User = require('../controllers/client/user');
const Apply = require('../controllers/client/apply');

/* GET users listing. */
router.get('/', function(req, res, next) {
    res.send('respond with a resource');
});

router.post('/signUp', User.signUp);

router.get('/logout', User.logout);

router.post('/apply', Apply.submitApply);

router.get('/hasActiveApp', Apply.checkAppStatus);

module.exports = router;
