'use strict';

var helper = {};
helper.navbarPage = require('../../pages/navbar-page');
helper.homePage   = require('../../pages/home-page');
helper.loginPage  = require('../../pages/login-page');

helper.login      = function login(user, password) {
  helper.navbarPage.login().click();
  helper.loginPage.usernameInput().sendKeys(user);
  helper.loginPage.passwordInput().sendKeys(password);
  helper.loginPage.submit().click();
  return true;
};

helper.logout      = function logout() {
  helper.navbarPage.dropDownMemu().click();
  helper.navbarPage.logout().click();
};

helper.isLoggedIn = function isLoggedIn() {
  return helper.navbarPage.username().isDisplayed();
};

helper.ensureLoggedIn = function ensureLoggedIn(user, password) {
  return helper.isLoggedIn().then(function(displayed) {
    if (!displayed) {
      helper.login(user, password);
    }
  });
};

helper.ensureLoggedOut = function ensureLoggedOut() {
  return helper.isLoggedIn().then(function(displayed) {
    if (displayed) {
      helper.logout();
    }
  });
};

helper.goHome = function goHome() {
  helper.navbarPage.home().click();
};

module.exports = helper;
