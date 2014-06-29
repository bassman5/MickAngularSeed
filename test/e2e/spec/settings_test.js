'use strict';

var expect = require('./../test_helper.js').expect;
var loginHelper = require('./../helpers/login-helper.js');
var settingsPage = require('../../pages/settings-page');

describe('settings page', function() {

  it('should load the page', function() {
    loginHelper.homePage.get();
    expect(loginHelper.homePage.isLoaded()).to.eventually.be.true;
  });

  it('should navigate to the settings page from nav dropdown', function() {
    loginHelper.ensureLoggedIn('fred@jones.com', 'Password');
    loginHelper.navbarPage.dropDownMenu().click();
    loginHelper.navbarPage.settings().click();
    expect(settingsPage.isLoaded()).to.eventually.be.true;
  });

});