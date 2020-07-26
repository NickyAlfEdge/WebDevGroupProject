const Apply = require('../../models/apply');
const mongoose = require('mongoose');


/**
 * post application to db
 * @param req
 * @param res
 */
function submitApply(req, res) {
    const json = req.body;
    const apply = new Apply(json);
    apply.save()
        .then((doc) => {
            res.json({message: 'success'});
        })
        .catch((err) => {
            res.status(500).json({message: 'failed'});
        });
}

/**
 * check active applications for user with target animal
 * @param req
 * @param res
 * @param next
 */
const checkAppStatus = function(req, res, next) {
    const candidateId = req.query.candidate;
    const animalId = req.query.animal;
    Apply.find({ candidate: candidateId, animal: animalId })
        .exec()
        .then((doc) => {
            if (doc.length === 0) {
                res.send("No App");
            } else {
                res.send("Active App");
            }
        }).catch((err) => {
        next(err);
    });
};

module.exports = {
    submitApply: submitApply,
    checkAppStatus: checkAppStatus,
};
