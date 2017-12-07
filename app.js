// most of this file is boiler plate provided by Express
// it's probably "a bit much" for a tiny test app, but it does show
// the framework following the "convention over configuration" paradigm
var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var games = require('./routes/games');
var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');

// other express settings
app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

// main index page
// express apps use matcher callbacks to determine what code gets run on a request
// this "index" route tells the app to render the "index" template (views/index.pug)
app.get('/', (request, response) => {
  response.render('index')
})

// use the Express Router in file path "/routes/game"
// we can store logically separete route collections in separate files
// and pull them in with require()
app.use('/api/games/', games);

// catch 404 and forward to error handler
// express apps "fall through" if no url is matched.
// here we create an error for 404 and call next()
// which forces the app to "fall through" again
app.use(function(req, res, next) {
  var err = new Error('This is not the page you are looking for');
  err.status = 404;
  next(err);
});

// error handler
// this is the bottom of the handlers and it renders a json error
app.use(function(err, req, res, next) {
  res.status(err.status || 500);
  res.json(err.message)
});

module.exports = app;
