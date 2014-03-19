'use strict';

var expect = require('./../test_helper.js').expect;

describe('contact page', function() {
  var contactPage = require('../pages/contact-page'),
    aboutPage = require('../pages/about-page');

  it('should load the page', function() {
    contactPage.get();
    expect(contactPage.isLoaded()).to.eventually.be.true;
  });

  it('should navigate to the about page when clicking', function() {
    contactPage.about().click();
    expect(aboutPage.isLoaded()).to.eventually.be.true;
  });

});