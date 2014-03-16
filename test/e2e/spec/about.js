'use strict';

var expect = require('./../helper.js').expect;

describe('about page', function() {
  var aboutPage = require('../pages/aboutPage'),
    contactPage = require('../pages/contactPage');

  it('should load the page', function() {
    aboutPage.get();
    expect(aboutPage.isLoaded()).to.eventually.be.true;
  });

  it('should navigate to the contact page when clicking', function() {
    aboutPage.contact().click();
    expect(contactPage.isLoaded()).to.eventually.be.true;
  });
});