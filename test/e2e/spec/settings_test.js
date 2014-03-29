'use strict';

var expect = require('./../test_helper.js').expect;

describe('settings page', function() {
  var navbarPage = require('../pages/navbar-page'),
    homePage = require('../pages/home-page'),
    settingsPage = require('../pages/settings-page');

  it('should load the page', function() {
    homePage.get();
    expect(homePage.isLoaded()).to.eventually.be.true;
  });

  it('should navigate to the settings page from nav dropdown', function() {
    navbarPage.dropDownMemu().click();
    navbarPage.settings().click();
    expect(settingsPage.isLoaded()).to.eventually.be.true;
  });

});