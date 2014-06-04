'use strict';

var express = require('express');
var router = express.Router();
var url = require('url');
var routes = {
  links: [
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


module.exports = router;
