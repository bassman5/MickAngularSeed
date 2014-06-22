'use strict';

var express = require('express'),
  router = express.Router(),
  routes = {
  links: [
    {
      rel: 'login',
      href: '/login',
      'method': 'POST'

    },
    {
      rel: 'register',
      href: '/register',
      'method': 'POST'
    },
    {
      rel: 'logout',
      href: '/logout',
      'method': 'POST'
    },
    {
      rel: 'user-profile',
      href: '/user-profile'
    }
  ]},
  authTokens = {};

/* GET links */
router.get('/', function(req, res) {
  res.send(200, routes);
});

/* GET user-profile. */
router.get('/user-profile', function (req, res) {
  if (req.header('Authorization') && authTokens[req.header('Authorization')]) {
    return res.send( {id: 1, firstName: 'Fred', lastName: 'Jones', username: 'fred@jones.com'});
  }
  return res.json(401, {message: 'Unauthorized'});
});

/* POST login. */
router.post('/login', function (req, res) {
  if (req.body.user.password === 'Password') {
    require('crypto').randomBytes(48, function(ex, buf) {
      var token = buf.toString('base64');
      authTokens[token] = req.body.user.username;
      return res.json({ authorizationToken: token });
    });
  }
  else {
    return res.json(401, {message: 'Username or password incorrect'});
  }
});

/* POST register. */
router.post('/register', function (req, res) {
  res.json({ authorizationToken: 'NjMwNjM4OTQtMjE0Mi00ZWYzLWEzMDQtYWYyMjkyMzNiOGIy' });
});

/* POST logout. */
router.post('/logout', function (req, res) {
  if (req.header('Authorization') && authTokens[req.header('Authorization')]) {
    delete authTokens[req.header('Authorization')];
    return res.json({});
  }
});

module.exports = router;
