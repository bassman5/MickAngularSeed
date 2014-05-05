'use strict';

var chai = require('chai');
var chaiAsPromised = require('chai-as-promised');
chai.use(chaiAsPromised);

var expect = chai.expect;

// jshint expr:true


module.exports = function() {
  this.World = require('../support/world.js').World; // overwrite default World constructor

  this.Given(/^An authenticated user$/, function (callback) {
    this.Navbar.login().click();

    expect(this.LoginPage.isLoaded(), 'login-view is present').to.eventually.equal(true);
    this.LoginPage.usernameInput().sendKeys('user@email.com');
    this.LoginPage.passwordInput().sendKeys('apassword');
    this.LoginPage.submit().click();
    callback();
  });

  this.When(/^I go to the settings page$/, function (callback) {
    this.Navbar.dropDownMemu().click();
    this.Navbar.settings().click();
    callback();
  });

  this.Then(/^I can view my settings\.$/, function (callback) {
    expect(this.SettingsPage.isLoaded(), 'settings-view is present').to.eventually.equal(true).and.notify(callback);
  });

};
