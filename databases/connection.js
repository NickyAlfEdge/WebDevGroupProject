const mongoose = require('mongoose');
const config = require('config-lite')(__dirname);

mongoose.connect(config.mongodb, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useFindAndModify: false,
});

const db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function() {
    // we're connected!
    console.log('mongoose is connected');
});
db.on('close', () => {
    console.log('mongoose has been disconnected');
});

module.exports = db;
