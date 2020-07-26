'use strict';
const Animal = require('../../models/animal');
const PetType = require('../../models/pettype');
const mongoose = require('mongoose');
const os = require('os');
const osType = os.type();

/**
 * get animals waiting for adoption list
 * @param req
 * @param res
 */
const getWaitingList = function(req, res) {
    Animal
        .find({status: 'Waiting'})
        .populate('adopter')
        .exec().then((result) => {
            const animals = result
            res.render('admin/pet_list_waiting', {
                pageTitle: 'Pets_List',
                animals: animals,
                adminName: req.session.name,
            });
        }).catch((err) => {
            console.log(err);
        });
};

/**
 * get animals that have been successfully adopted list
 * @param req
 * @param res
 */
const getAdoptedList = function(req, res) {
    Animal
        .find({status: 'Adopted'})
        .populate('adopter')
        .exec()
        .then((result) => {
            const animals = result;
            res.render('admin/pet_list_adopted', {
                pageTitle: 'Pets_List',
                animals: animals,
                adminName: req.session.name,
            });
        }).catch((err) => {
            console.log(err);
        });
};

/**
 * get animal details page, admin view
 * @param req
 * @param res
 */
const getAnimalDetail = function(req, res) {
    const animalId = mongoose.Types.ObjectId(req.query.id);
    Animal
        .findOne({_id: animalId})
        .populate('adopter')
        .exec()
        .then((result) => {
            const animal = result;
            res.render('admin/pet_detail', {
                pageTitle: 'Pet_detail',
                animal: animal,
                adminName: req.session.name,
            });
        }).catch((err) => {
            console.log(err);
        });
};

/**
 * load the add new animal page and place animals
 * @param req
 * @param res
 */
const loadAddNew = function(req, res) {
    PetType
        .find()
        .exec()
        .then((doc) =>{
            res.render('admin/add_new_animal', {
                pageTitle: 'Add new animal',
                adminName: req.session.name,
                petTypes: doc,
            });
        })
        .catch((err) =>{
            console.log(err)
        });
};

/**
 * create new animal, admin functionality
 * @param req
 * @param res
 */
const createNew = function(req, res) {
    console.log('enter controller');
    const data = req.body;
    const path = req.file.path;
    let pathArray;
    if (osType == 'Darwin' || osType == 'Linux') {
        pathArray  = path.split('/');
    } else if (osType === 'Windows_NT') {
        pathArray = path.split('\\');
    }
    const relativePath = '/' + pathArray[(pathArray.length - 2)] + '/' + pathArray[(pathArray.length - 1)];
    console.log('load');
    console.log(data);
    console.log(path);
    const animal = new Animal({
        name: data.name,
        dob: data.dob,
        petType: data.petType,
        petBreed: data.petBreed,
        owner: data.owner,
        telephone: data.telephone,
        street: data.street,
        town: data.town,
        country: data.country,
        postcode: data.postcode,
        detail: data.detail,
        status: 'Waiting',
        imgUrl: relativePath,
    });
    animal.save(function(err, result) {
        if (err) {
            console.log(err);
        }
        res.setHeader('Content-Type', 'application/json');
        res.send(JSON.stringify(animal));
    });
};

/**
 * add comment, admin side
 * @param req
 * @param res
 */
const addComment = function(req, res) {
    const id = req.query.id;
    const comment = req.body.comment;
    const name = req.session.name;
    const date = new Date();
    Animal
        .findOneAndUpdate({_id: id}, {$push: {comment: {name: name, comment: comment, date: date}}})
        .then(function(result) {
            res.redirect('/admin/pet_detail?id=' + id);
        }).catch((err) => {
            console.log(err);
        });
};


module.exports = {
    getWaitingList: getWaitingList,
    getAnimalDetail: getAnimalDetail,
    getAdoptedList: getAdoptedList,
    loadAddNew: loadAddNew,
    createNew: createNew,
    addComment: addComment,
};

