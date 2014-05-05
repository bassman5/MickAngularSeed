'use strict';


var World = function World(callback) {
  this.HomePage     = require('../../../pages/home-page');
  this.Navbar       = require('../../../pages/navbar-page');
  this.AboutPage    = require('../../../pages/about-page');
  this.ContactPage  = require('../../../pages/contact-page');
  this.LoginPage    = require('../../../pages/login-page');
  this.SettingsPage = require('../../../pages/settings-page');

  callback(); // tell Cucumber we're finished and to use 'this' as the world instance
};
exports.World = World;