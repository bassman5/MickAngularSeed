'use strict';


var World = function World(callback) {
  this.HomePage     = require('../../../pages/home-page');
  this.Navbar       = require('../../../pages/navbar-page');
  this.ContactPage  = require('../../../pages/contact-page');
  this.AboutPage    = require('../../../pages/about-page');
  this.LoginPage    = require('../../../pages/login-page');
  this.SettingsPage = require('../../../pages/settings-page');
  this.navigateTo   = function(el) { return el.click(); };


  this.login      = function login(user, password) {
    this.Navbar.login().click();
    this.LoginPage.usernameInput().clear();
    this.LoginPage.passwordInput().clear();
    this.LoginPage.usernameInput().sendKeys(user);
    this.LoginPage.passwordInput().sendKeys(password);
    return this.LoginPage.submit().click();
  };

  this.logout      = function logout() {
    this.Navbar.dropDownMenu().click();
    this.Navbar.logout().click();
  };

  this.isLoggedIn = function isLoggedIn() {
    return this.Navbar.username().isDisplayed();
  };

  this.ensureLoggedIn = function ensureLoggedIn(user, password) {
    var self   = this;
    return this.isLoggedIn().then(function(displayed) {
      if (!displayed) {
        return self.login(user, password);
      }
    });
  };

  this.ensureLoggedOut = function ensureLoggedOut() {
    var self   = this;
    return this.isLoggedIn().then(function(displayed) {
      if (displayed) {
        self.logout();
      }
    }, this);
  };

  this.goHome = function goHome() {
    return this.navigateTo(this.Navbar.home());
  };

  this.isAuthenticated = function isAuthenticated() {
    return this.Navbar.isAuthenticated();
  };
  
  
  callback(this); // tell Cucumber we're finished and to use 'this' as the world instance
};
exports.World = World;