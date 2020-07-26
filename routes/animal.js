'use strict';
const express = require('express');
const router = express.Router();
const checkIsAdminLogin = require('../middlewares/check').checkIsAdminLogin;
const Animal = require('../controllers/client/animal');

router.get('/view', checkIsAdminLogin, function(req, res) {
    Animal.list(req, res);
});

router.get('/add', checkIsAdminLogin, function(req, res) {
    Animal.create(req, res);
});

router.get('/detail/:id', checkIsAdminLogin, function(req, res) {
    Animal.detail(req, res);
});

router.get('/application_thanks', checkIsAdminLogin, function(req, res) {
    res.render('client/application_thanks');
});

router.post('/add_comment', checkIsAdminLogin, function(req, res) {
    Animal.addComment(req,res);
});

module.exports = router;
