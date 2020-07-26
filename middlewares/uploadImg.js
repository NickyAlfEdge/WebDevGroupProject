const multer = require('multer');
const path = require('path');

const storePath = path.join(__dirname.substring(0, (__dirname.length-12)), 'public/uploads/');
console.log(storePath);
// storage defines the storage options to be used for file upload with multer
var storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, storePath);
    },
    filename: function (req, file, cb) {
        var original = file.originalname;
        var file_extension = original.split(".");
        // Make the file name the date + the file extension
        filename =  Date.now() + '.' + file_extension[file_extension.length-1];
        cb(null, filename);
    }
});
var upload = multer({ storage: storage });

module.exports = upload;
