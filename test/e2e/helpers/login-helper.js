'use strict';

var helper = {};
helper.navbarPage = require('../../pages/navbar-page');
helper.homePage   = require('../../pages/home-page');
helper.loginPage  = require('../../pages/login-page');

helper.login      = function login(user, password) {
  helper.navbarPage.login().click();
  helper.loginPage.typeUsername(user);
  helper.loginPage.typePassword(password);
  return helper.loginPage.submitLogin();

};

helper.logout      = function logout() {
  helper.navbarPage.dropDownMenu().click();
  return helper.navbarPage.logout().click();
};

helper.isAuthenticated = function isAuthenticated() {
//  browser.driver.wait(function() {
//    return helper.navbarPage.username().isDisplayed() && helper.navbarPage.username().isDisplayed().then(function(displayed) {
//      return true === displayed;
//    });
//  }, 1000);
//
  return helper.navbarPage.isAuthenticated();
};

helper.ensureLoggedIn = function ensureLoggedIn(user, password) {
  return helper.isAuthenticated().then(function(displayed) {
    if (!displayed) {
      return helper.login(user, password);
    }
  });
};

helper.ensureLoggedOut = function ensureLoggedOut() {
//  return helper.isLoggedIn().then(function(displayed) {
//    if (displayed) {
//      return helper.logout();
//    }
//  });

  return browser.driver.wait(function() {
    return helper.isAuthenticated().then(function(displayed) {
      if (displayed) {
        return helper.logout();
      }
    });

  }, 1000);

};

helper.goHome = function goHome() {
  return helper.navbarPage.home().click();
};

module.exports = helper;
