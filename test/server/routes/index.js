'use strict';

var express = require('express');
var router = express.Router();
var url = require('url');
var routes = {
  links: [
    {
      rel: 'api',
      href: '/api/v1'
    }
  ]};

/* GET home page. */
router.get('/', function(req, res, next) {
  if (req.accepts('text/html')) {
    next();
  }
  else {
    res.send(200, routes);
  }
});

/* GET status page. */
router.get('/status', function(req, res, next) {
  res.send(200, 'OK');
});


/* POST sink,html. */
router.post('/sink.html', function (req, res) {
  res.json({});
});

module.exports = router;
