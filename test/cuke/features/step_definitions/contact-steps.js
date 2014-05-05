'use strict';

var chai = require('chai');
var chaiAsPromised = require('chai-as-promised');
chai.use(chaiAsPromised);

var expect = chai.expect;

// jshint expr:true


module.exports = function() {
  this.World = require('../support/world.js').World; // overwrite default World constructor

  this.When(/^I go to the contact page$/, function (callback) {
    this.ContactPage.get();
    expect(this.ContactPage.isLoaded(), 'contact-view is present').to.eventually.equal(true).and.notify(callback);
  });

  this.Then(/^I can navigate to the about page\.$/, function (callback) {
    this.ContactPage.about().click();
    expect(this.AboutPage.isLoaded(), 'about-view is present').to.eventually.equal(true).and.notify(callback);
  });

};
