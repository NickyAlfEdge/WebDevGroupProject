const mongoose = require('mongoose');
const commentSchema = new mongoose.Schema({
    name: String,
    comment: String,
    date: Date,
});
const animalSchema = new mongoose.Schema({
    name: {type: String, required: true, max: 100},
    dob: {type: Date},
    petType: {type: String, required: true},
    petBreed: {type: String},
    street: String,
    town: String,
    country: String,
    postcode: String,
    location: [Number],
    detail: String,
    owner: String,
    telephone: String,
    adopter: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'users',
    },
    imgUrl: [String],
    createTime: {type: Date, default: Date.now()},
    updateTime: {type: Date, default: Date.now()},
    status: {
        type: String,
        enum: ['Waiting', 'Adopted'],
        default: 'Waiting',
    },
    comment: [commentSchema],
});

animalSchema.virtual('age').get(
    function() {
        // eslint-disable-next-line no-invalid-this
        if (this.dob) {
            const currentYear = new Date().getFullYear();
            // eslint-disable-next-line no-invalid-this
            return currentYear - this.dob.getFullYear() + 1;
        } else {
            return 0;
        }
    });

animalSchema.virtual('intervalFromLastUpdate').get(function() {
    // eslint-disable-next-line no-invalid-this
    const updateTime = this.updateTime ? this.createTime : this.updateTime;
    const second = (new Date().getTime() - updateTime.getTime()) / 1000;
    const d = Math.floor(second / (3600 * 24));
    const h = Math.floor(second % (3600 * 24) / 3600);
    const m = Math.floor(second % 3600 / 60);
    const dDisplay = d > 0 ? d + (d === 1 ? ' day' : ' days') : '';
    if (dDisplay) {
        return dDisplay;
    }
    const hDisplay = h > 0 ? h + (h === 1 ? ' hour' : ' hours') : '';
    if (hDisplay) {
        return hDisplay;
    }
    const mDisplay = m + (m === 1 ? ' minute' : ' minutes');
    return mDisplay;
});

animalSchema.set('toObject', {getters: true, virtuals: true});


animalSchema.statics.totalCount = function(findArgs) {
    return new Promise((resolve, reject) => {
        Animal.countDocuments(findArgs)
            .then((count) => {
                resolve(count);
            })
            .catch((err) => {
                console.log(err);
                reject(err);
            });
    });
};
animalSchema.statics.searchBriefList = function(findArgs, skipNum, pageSize) {
    return new Promise((resolve, reject) => {
        Animal.find(findArgs)
            .select('-adopter -comment')
            .sort({updateTime: -1})
            .limit(pageSize)
            .skip(skipNum)
            .exec()
            .then((doc) => {
                resolve(doc);
            })
            .catch((err) => {
                console.log(err);
                reject(err);
            });
    });
};
animalSchema.statics.pageBriefInfoList =
    function(findArgs = {},
        pageNum = 1,
        pageSize = 9) {
        return new Promise((resolve, reject) => {
            const skipNum = (pageNum - 1) * pageSize;
            Promise.all([
                Animal.searchBriefList(findArgs, skipNum, pageSize),
                Animal.totalCount(findArgs),
            ])
                .then((result) => {
                    resolve({
                        animals: result[0],
                        pageNum: pageNum,
                        pageSize: pageSize,
                        total: result[1],
                        totalPage: Math.ceil(result[1] / pageSize),
                    });
                }).catch((err) => {
                console.log(err);
                reject(err);
            });
        });
    };

const Animal = mongoose.model('animals', animalSchema);

module.exports = Animal;

