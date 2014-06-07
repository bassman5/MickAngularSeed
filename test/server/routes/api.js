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
      rel: 'user-profile',
      href: '/user-profile'
    }
  ]};

/* GET links */
router.get('/', function(req, res) {
  res.send(200, routes);
});

/* GET user-profile. */
router.get('/user-profile', function (req, res) {
  res.send( {id: 1, firstName: 'Fred', lastName: 'Jones', username: 'fred@jones.com'});
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

module.exports = router;
