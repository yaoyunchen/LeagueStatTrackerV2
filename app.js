// MAIN DEPENDENCIES
// -----------------
var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var mongoose = require('mongoose');
var http = require('http');

// ROUTES
// ------
var routes = require('./routes/index');

// EXPRESS INSTANCE
// ----------------
var app = express();

// CONFIG
// ------
var config = require('./_config');

// MONGOOSE
// --------
// // MONGODB SCHEMAS
// require('./models/regions');
// require('./models/gametypes');

mongoose.connect(config.mongoURI[app.settings.env], function(err, res) {
  if (err) {
    console.error('Error connecting to database: ', err);
  } else {
    // console.log('Connected to database: ' + config.mongoURI[app.settings.env]);
  }
})
// mongoose.connect('mongodb://localhost/LeagueStatTrackerApp');

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

// MIDDLEWARE
// ----------
// uncomment after placing favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.use(express.static(path.join(__dirname, 'views')));

// MAIN ROUTES
// -----------
app.use('/', routes);


// catch 404 and forward to error handler
app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// ERROR HANDLERS
// --------------
// Development error handler, will print stacktrace
if (app.get('env') === 'development') {
  app.use(function(err, req, res, next) {
    res.status(err.status || 500);
    res.render('error', {
      message: err.message,
      error: err
    });
  });
}

// Production error handler, no stacktraces leaked to user
app.use(function(err, req, res, next) {
  res.status(err.status || 500);
  res.render('error', {
    message: err.message,
    error: {}
  });
});

module.exports = app;
