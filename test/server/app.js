var express = require('express');
var path = require('path');
var favicon = require('static-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');

var routes = require('./routes/index');
var users = require('./routes/users');

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

app.use(favicon());
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded());
app.use(cookieParser());

// serve some dynamic pages if we need them
//app.use('/', routes);
app.use('/users', users);

// dev mode
if (app.get('env') === 'development') {
  // live reload script
  var liveReloadPort = 35729;
  var excludeList = ['.woff', '.flv'];

  app.use(require('connect-livereload')({
    port: liveReloadPort,
    excludeList: excludeList
  }));
  app.use(express.static(path.join(__dirname, '../..')));
  app.use(express.static(path.join(__dirname, '../../bower_components')));
  app.use(express.static(path.join(__dirname, '../../.tmp')));
  app.use(express.static(path.join(__dirname, '../../app')));
};


// prod mode
if (app.get('env') === 'production') {
  app.use(express.static(path.join(__dirname, '../../dist')));
};




/// catch 404 and forwarding to error handler
app.use(function(req, res, next) {
    var err = new Error('Not Found');
    err.status = 404;
    next(err);
});

/// error handlers

// development error handler
// will print stacktrace
if (app.get('env') === 'development') {
    app.use(function(err, req, res, next) {
        res.status(err.status || 500);
        res.render('error', {
            message: err.message,
            error: err
        });
    });
}

// production error handler
// no stacktraces leaked to user
app.use(function(err, req, res, next) {
    res.status(err.status || 500);
    res.render('error', {
        message: err.message,
        error: {}
    });
});


module.exports = app;
