'use strict';

var chai = require('chai');
var chaiAsPromised = require('chai-as-promised');
chai.use(chaiAsPromised);

var expect = chai.expect;

// jshint expr:true


module.exports = function() {
  this.World = require('../support/world.js').World;

  this.Given(/^an authenticated user$/, function (callback) {
    this.ensureLoggedIn('user@email.com','apassword').then(callback, callback.fail);
  });

  this.When(/^I go to the settings page$/, function (callback) {
    this.Navbar.dropDownMenu().click();
    this.Navbar.settings().click();
    callback();
  });

  this.Then(/^I can view my settings\.$/, function (callback) {
    expect(this.SettingsPage.isLoaded(), 'settings-view is present').to.eventually.equal(true).and.notify(callback);
  });

};
