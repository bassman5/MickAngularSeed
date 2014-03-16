var expect = require('./../helper.js').expect;

describe('contact page', function() {
  var contactPage = require('../pages/contactPage'),
    aboutPage = require('../pages/aboutPage');

  it('should load the page', function() {
    contactPage.get();
    expect(contactPage.isLoaded()).to.eventually.be.true
  });

  it('should navigate to the about page when clicking', function() {
    contactPage.about.click();
    expect(aboutPage.isLoaded()).to.eventually.be.true
  });

});