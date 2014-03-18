'use strict';

var expect = require('./../test_helper.js').expect;

describe('home page', function() {
  var homePage = require('../pages/home-page'),
    aboutPage = require('../pages/about-page');

  it('should load the page', function()
  {
    homePage.get();
    expect(homePage.isLoaded()).to.eventually.be.true;
  });

  it('should navigate to the about page when clicking', function() {
    homePage.footerAbout().click();
    expect(aboutPage.isLoaded()).to.eventually.be.true;
  });
});