const express = require('express');
const PetType = require('../../models/pettype');

/**
 * return page
 * @param req
 * @param res
 * @param next
 */
const page = (req, res, next) => {
    PetType.find()
        .exec()
        .then((doc) => {
            res.json(doc);
        })
        .catch((err) => {
            res.send(err);
        });
};

/**
 * find all types and sub breeds
 * @param req
 * @param res
 * @param next
 */
const allTypes = (req, res, next) => {
    PetType.find()
        .exec()
        .then((doc) =>{
            res.locals.petTypes = doc;
            next();
        })
        .catch((err) =>{
            next(err);
        });
};

module.exports = {
    page: page,
    allTypes: allTypes,
};
