const mongoose = require('mongoose');
const Schema = new mongoose.Schema({
    typeName: {type: String, required: true},
    petBreed: [String],
});

const PetType = mongoose.model('PetType', Schema);

module.exports = PetType;
