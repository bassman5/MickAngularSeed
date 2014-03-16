'use strict';

var expect = require('./../helper.js').expect;

describe('home page', function() {
  var homePage = require('../pages/homePage'),
    aboutPage = require('../pages/aboutPage');

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