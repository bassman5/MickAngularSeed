'use strict';

var chai = require('chai');
var chaiAsPromised = require('chai-as-promised');
chai.use(chaiAsPromised);

var expect = chai.expect;

// jshint expr:true


module.exports = function() {
  this.World = require('../support/world.js').World; // overwrite default World constructor

  this.Given(/^A user$/, function (callback) {
    callback();
  });

  this.When(/^I go to the home page$/, function (callback) {
    this.navigateTo(this.Navbar.home());
    callback();
  });

  this.Then(/^I see the initial call to action\.$/, function (callback) {
    expect(this.HomePage.isLoaded()).to.eventually.equal(true).and.notify(callback);
  });

  this.When(/^I navigate to the about page$/, function (callback) {
    this.navigateTo(this.HomePage.footerAbout());
    callback();
  });

  this.Then(/^I see more information\.$/, function (callback) {
    expect(this.AboutPage.isLoaded(), 'about-view is present').to.eventually.equal(true).and.notify(callback);
  });

  this.When(/^I navigate to the contact page$/, function (callback) {
    this.navigateTo(this.HomePage.footerContact());
    callback();
  });

  this.Then(/^I see contact information\.$/, function (callback) {
    expect(this.ContactPage.isLoaded(), 'contact-view is present').to.eventually.equal(true).and.notify(callback);
  });
};
