'use strict';

var express = require('express');
var router = express.Router();
var url = require('url');
var routes = {
  links: [
    {
      rel: 'login',
      href: '/login',
      "method": "POST"

    },
    {
      rel: 'register',
      href: '/register',
      "method": "POST"
    },
    {
      rel: 'logout',
      href: '/logout',
      "method": "POST"
    },
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

/* POST login. */
router.post('/login', function (req, res) {
  res.json({ authorizationToken: 'NjMwNjM4OTQtMjE0Mi00ZWYzLWEzMDQtYWYyMjkyMzNiOGIy' });
});

/* POST register. */
router.post('/register', function (req, res) {
  res.json({ authorizationToken: 'NjMwNjM4OTQtMjE0Mi00ZWYzLWEzMDQtYWYyMjkyMzNiOGIy' });
});

/* POST logout. */
router.post('/logout', function (req, res) {
  res.json({});
});

/* POST sink,html. */
router.post('/sink.html', function (req, res) {
  res.json({});
});

module.exports = router;
