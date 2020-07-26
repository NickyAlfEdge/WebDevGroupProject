module.exports = {
    port: 3000,
    session: {
        secret: 'pet',
        key: 'pet',
        maxAge: 2592000000,
    },
    mongodb: 'mongodb+srv://webTechUser:nc4dkc9LIehbAcTp@cluster0-woi6a.mongodb.net/test?retryWrites=true&w=majority',
};
