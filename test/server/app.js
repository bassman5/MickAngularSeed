var express        = require('express');
var path           = require('path');
var favicon        = require('static-favicon');
var cookieParser   = require('cookie-parser');
var logger         = require('morgan');
var bodyParser     = require('body-parser');
var methodOverride = require('method-override');
var app = express();

app.use(bodyParser()); 						// pull information from html in POST
app.use(methodOverride()); 			 // simulate DELETE and PUT

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

app.use(favicon());
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded());
app.use(cookieParser());

// serve some dynamic pages if we need them
app.use('/', require('./routes/index'));
app.use('/api/v1', require('./routes/api'));


var env = process.env.NODE_ENV || 'development';
if ('development' == env) {
  // configure stuff here
}

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
  app.use(logger('dev')); 					                            // log every request to the console
}


// prod mode
if (app.get('env') === 'production') {
  app.use(express.static(path.join(__dirname, '../../dist')));
}




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
    app.use(function(err, req, res) {
        res.status(err.status || 500);
        res.render('error', {
            message: err.message,
            error: err
        });
    });
}

// production error handler
// no stacktraces leaked to user
app.use(function(err, req, res) {
    res.status(err.status || 500);
    res.render('error', {
        message: err.message,
        error: {}
    });
});


module.exports = app;
