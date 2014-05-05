'use strict';

var expect = require('./../test_helper.js').expect;

describe('about page', function() {
  var aboutPage = require('../../pages/about-page'),
    contactPage = require('../../pages/contact-page');

  it('should load the page', function() {
    aboutPage.get();
    expect(aboutPage.isLoaded()).to.eventually.be.true;
  });

  it('should navigate to the contact page when clicking', function() {
    aboutPage.contact().click();
    expect(contactPage.isLoaded()).to.eventually.be.true;
  });
});