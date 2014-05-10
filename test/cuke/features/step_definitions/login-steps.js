'use strict';

/*global protractor */

var chai = require('chai');
var chaiAsPromised = require('chai-as-promised');
chai.use(chaiAsPromised);

var expect = chai.expect;

// jshint expr:true


module.exports = function() {

  this.World = require('../support/world.js').World; // overwrite default World constructor

  this.Given(/^A registered user with credentials "([^"]*)" "([^"]*)"$/, function (user, password, callback) {
    this.navigateTo (this.Navbar.login());

    expect(this.LoginPage.isLoaded(), 'login-view is present').to.eventually.equal(true);
    this.LoginPage.usernameInput().clear();
    this.LoginPage.passwordInput().clear();
    this.LoginPage.usernameInput().sendKeys(user);
    this.LoginPage.passwordInput().sendKeys(password);
    callback();
  });

  this.When(/^I submit my correct authorization details$/, function (callback) {
    this.navigateTo (this.LoginPage.submit()).then(callback, callback.fail);
  });

  this.Then(/^I am fully authenticated\.$/, function (callback) {
    expect(this.isAuthenticated(), 'isAuthenticated').to.eventually.equal(true).and.notify(callback);
  });

  this.When(/^I logout$/, function (callback) {
    this.navigateTo (this.Navbar.dropDownMenu());
    this.navigateTo (this.Navbar.logout()).then(callback, callback.fail);
  });

  this.Then(/^I am not longer authenticated\.$/, function (callback) {
    expect(this.isAuthenticated(), 'not Authenticated').to.eventually.equal(false).and.notify(callback);
  });


  this.Given(/^An authenticated user$/, function (callback) {
    callback();
  });

  this.Given(/^An unauthenticated user$/, function (callback) {
    this.navigateTo (this.Navbar.login()).then(callback, callback.fail);
  });


  this.Then(/^I enter invalid email addresses$/, function (table, callback) {
    this.LoginPage.passwordInput().clear();
    this.LoginPage.passwordInput().sendKeys('aPassword');

    var tests = table.rows().map(function (row) {
      var email = row[0];
      this.LoginPage.usernameInput().clear();
      this.LoginPage.usernameInput().sendKeys(email);
      return (this.LoginPage.submit().isEnabled());
    }, this);

    return protractor.promise.fullyResolved(tests)
    .then(function(items) {
        items.forEach(function (item) {
          expect(item).to.equal(false);
        });
      })
      .then(callback);
  });

  this.Then(/^I enter invalid passwords$/, function (table, callback) {
    this.LoginPage.usernameInput().clear();
    this.LoginPage.usernameInput().sendKeys('aUser@gmail.com');

    var tests = table.rows().map(function (row) {
      var password = row[0];
      this.LoginPage.passwordInput().clear();
      this.LoginPage.passwordInput().sendKeys(password);
      return (this.LoginPage.submit().isEnabled());
    }, this);

    return protractor.promise.fullyResolved(tests)
      .then(function(items) {
        items.forEach(function (item) {
          expect(item).to.equal(false);
        });
      })
      .then(callback);
  });



  this.Then(/^I am not allowed to login\.$/, function (callback) {
    callback();
  });



};
