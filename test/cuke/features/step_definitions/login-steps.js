'use strict';

var chai = require('chai');
var chaiAsPromised = require('chai-as-promised');
chai.use(chaiAsPromised);

var expect = chai.expect;

module.exports = function() {

  this.World = require('../support/world.js').World; // overwrite default World constructor

  this.Given(/^A registered user$/, function (callback) {
//    this.Given(/^A registered user with credentials "([^"]*)" "([^"]*)"$/, function (user, password, callback) {
    this.navigateTo (this.Navbar.login());

    expect(this.LoginPage.isLoaded(), 'login-view is present').to.eventually.equal(true);
    this.LoginPage.typeUsername('user@email.com');
    this.LoginPage.typePassword('Password');
    callback();
  });

  this.When(/^I submit my correct authorization details$/, function (callback) {
    this.LoginPage.submitLogin();
    callback();
  });

  this.Then(/^I am fully authenticated\.$/, function (callback) {
    expect(this.isAuthenticated(), 'isAuthenticated').to.eventually.equal(true).and.notify(callback);
  });

  this.When(/^I logout$/, function (callback) {
    this.navigateTo (this.Navbar.dropDownMenu());
    this.navigateTo (this.Navbar.logout());
    callback();
  });

  this.Then(/^I am not longer authenticated\.$/, function (callback) {
    expect(this.isAuthenticated(), 'not Authenticated').to.eventually.equal(false).and.notify(callback);
  });


  this.Given(/^An authenticated user$/, function (callback) {
    callback();
  });

  this.Given(/^An unauthenticated user$/, function (callback) {
    this.navigateTo (this.Navbar.login());
    callback();
  });


  this.Then(/^I enter invalid email addresses$/, function (table, callback) {
    this.LoginPage.typePassword('aPassword');

    var tests = table.rows().map(function (row) {
      var email = row[0];
      this.LoginPage.typeUsername(email);
      return (this.LoginPage.submitEnabled());
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
    this.LoginPage.typeUsername('aUser@gmail.com');

    var tests = table.rows().map(function (row) {
      var password = row[0];
      this.LoginPage.typePassword(password);
      return (this.LoginPage.submitEnabled());
    }, this);

    return protractor.promise.fullyResolved(tests)
      .then(function(items) {
        items.forEach(function (item) {
          expect(item).to.equal(false);
        });
      })
      .then(callback);
  });


  this.When(/^I submit incorrect authorization details$/, function (callback) {
    this.LoginPage.typePassword('badPassword');
    this.LoginPage.submitLogin();
    callback();
  });


  this.Then(/^I am not authenticated\.$/, function (callback) {
    expect(this.isAuthenticated(), 'isAuthenticated').to.eventually.equal(false).and.notify(callback);
  });

  this.Then(/^An error message is displayed$/, function (callback) {
    expect(this.LoginPage.errorMessage(), 'error message is displayed').to.eventually.equal('Username or password incorrect');
    callback();
  });




  this.Then(/^I am not allowed to login\.$/, function (callback) {
    expect(this.LoginPage.submitEnabled()).to.eventually.equal(false).and.notify(callback);
  });



};
