const createError = require('http-errors');
const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');
const session = require('express-session');
const MongoStore = require('connect-mongo')(session);
const config = require('config-lite')(__dirname);
const bodyParser = require('body-parser');
const favicon = require('serve-favicon');

// routers
const indexRouter = require('./routes/index');
const usersRouter = require('./routes/users');
const authorizationRouter = require('./routes/authorization');
const animalRouter = require('./routes/animal');
const petTypeRouter = require('./routes/pettype');
const adminRouter = require('./routes/admin');

const app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');
app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));

app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({extended: false}));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.use(session({
    secret: 'shijieshangzh!y0uwand0ngsenhebuwand0ngsenderen',
    resave: false,
    saveUninitialized: true,
    rolling: true,
    cookie: {maxAge: 60 * 60 * 1000},
    store: new MongoStore({
        url: config.mongodb,
    }),
}));

app.use(function(req, res, next) {
    // get session from template
    res.locals.user = req.session.user;
    next();
});

app.use('/', indexRouter);
app.use('/', authorizationRouter);
app.use('/users', usersRouter);
app.use('/animal', animalRouter);
app.use('/petType', petTypeRouter);
app.use('/admin', adminRouter);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
    next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
    console.log(err);
    // set locals, only providing error in development
    res.locals.message = err.message;
    res.locals.error = req.app.get('env') === 'development' ? err : {};
    // render the error page
    res.status(err.status || 500);
    res.render('error');
});

module.exports = app;
