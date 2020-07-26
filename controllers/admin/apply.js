'use strict';
const Apply = require('../../models/apply');
const Animal = require('../../models/animal');
const mongoose = require('mongoose');

/**
 * get all pending adoption applications
 * @param req
 * @param res
 */
const getAllPending = function(req, res) {
    Apply
        .find({status: 'Pending'})
        .populate('candidate')
        .populate('animal')
        .exec()
        .then((result) => {
            res.render('admin/application_list_pending', {
                pageTitle: 'applications',
                applications: result,
                adminName: req.session.name,
            });
        }).catch((err) => {
            console.log(err);
        });
};

/**
 * get all approved adoption application
 * @param req
 * @param res
 */
const getAllApproved = function(req, res) {
    Apply
        .find({status: 'Approved'})
        .populate('candidate')
        .populate('animal')
        .exec()
        .then((result) => {
            res.render('admin/application_list_approved', {
                pageTitle: 'applications',
                applications: result,
                adminName: req.session.name,
            });
        }).catch((err) => {
            console.log(err);
        });
};

/**
 * get all rejected adoption applications
 * @param req
 * @param res
 */
const getAllRejected = function(req, res) {
    Apply
        .find({status: 'Rejected'})
        .populate('candidate')
        .populate('animal')
        .exec()
        .then((result) => {
            res.render('admin/application_list_rejected', {
                pageTitle: 'applications',
                applications: result,
                adminName: req.session.name,
            });
        }).catch((err) => {
            console.log(err);
        });
};

/**
 * get a specific application for a target id
 * @param req
 * @param res
 */
const getApplication = function(req, res) {
    const applyId = req.query.id;
    Apply
        .findOne({_id: applyId})
        .populate('candidate')
        .populate('animal')
        .exec()
        .then((result) => {
            res.render('admin/application_detail', {
                pageTitle: 'applications',
                application: result,
                adminName: req.session.name,
            });
        }).catch((err) => {
            console.log(err);
        });
};

/**
 * approve an active application
 * @param req
 * @param res
 */
const approveApplication = function(req, res) {
    const applyId = req.query.id;
    Apply
        .findOneAndUpdate({_id: applyId}, {$set: {status: 'Approved'}})
        .exec()
        .then((result) => {
            const application = result;
            const userId = application.candidate;
            const animalId = application.animal;
            Animal
                // eslint-disable-next-line max-len
                .findOneAndUpdate({_id: animalId}, {$set: {adopter: userId, status: 'Adopted'}})
                .exec()
                .then(function() {
                    res.redirect('/admin/application_detail?id=' + applyId);
                });
        }).catch((err) => {
            console.log(err);
        });
};

/**
 * reject an active application
 * @param req
 * @param res
 */
const rejectApplication = function(req, res) {
    const applyId = req.query.id;
    Apply
        .findOneAndUpdate({_id: applyId}, {$set: {status: 'Rejected'}})
        .exec()
        .then((result) => {
            res.redirect('/admin/application_detail?id=' + applyId);
        }).catch((err) => {
            console.log(err);
        });
};

/**
 * move an approved adoption back to pending
 * @param req
 * @param res
 */
const approveToPending = function(req, res) {
    const applyId = req.query.id;
    Apply
        .findOneAndUpdate({_id: applyId}, {$set: {status: 'Pending'}})
        .exec()
        .then((result) => {
            const animalId = result.animal;
            Animal
                // eslint-disable-next-line max-len
                .findOneAndUpdate({_id: animalId}, {$unset: {adopter: ''}, $set: {status: 'Waiting'}})
                .exec()
                .then(function() {
                    res.redirect('/admin/application_detail?id=' + applyId);
                });
        }).catch((err) => {
            console.log(err);
        });
};

/**
 * move a rejected application back to pending
 * @param req
 * @param res
 */
const rejectedToPending = function(req, res) {
    const applyId = req.query.id;
    Apply
        .findOneAndUpdate({_id: applyId}, {$set: {status: 'Pending'}})
        .exec()
        .then((result) => {
            res.redirect('/admin/application_detail?id=' + applyId);
        }).catch((err) => {
            console.log(err);
        });
};

module.exports = {
    getAllPending: getAllPending,
    getAllApproved: getAllApproved,
    getAllRejected: getAllRejected,
    getApplication: getApplication,
    approveApplication: approveApplication,
    rejectApplication: rejectApplication,
    approvedToPending: approveToPending,
    rejectedToPending: rejectedToPending,
};
