'use strict';

var expect = require('./../test_helper.js').expect;
var loginHelper = require('./../helpers/login-helper.js');

describe('login page', function() {

  it('should load the home page', function() {
    loginHelper.homePage.get();
    expect(loginHelper.homePage.isLoaded()).to.eventually.be.true;
  });


  it('should login', function() {
    expect(loginHelper.isAuthenticated()).to.eventually.not.be.true;
    loginHelper.login('fred@jones.com', 'aPassword');
    expect(loginHelper.isAuthenticated()).to.eventually.be.true;
    expect(loginHelper.homePage.isLoaded()).to.eventually.be.true;
    expect(loginHelper.navbarPage.username().getText()).to.eventually.be.equal('fred@jones.com');
  });

  it('should login then logout ', function() {
    loginHelper.ensureLoggedIn('fred@jones.com', 'aPassword');
    expect(loginHelper.isAuthenticated(), 'loggedIn').to.eventually.be.true;
    loginHelper.logout();
    expect(loginHelper.isAuthenticated(), 'not isLoggedIn').to.eventually.not.be.true;
  });


/*  it('should not enable login if email is invalid ', function() {
    var invalidEmails = ['notemail', 'notemail@', 'notemail@@aa'];
    loginHelper.ensureLoggedOut();
    loginHelper.navbarPage.login().click();

    loginHelper.loginPage.typePassword('aPassword');

    invalidEmails.forEach(function (email) {
      loginHelper.loginPage.typeUsername(email);
      expect(loginHelper.loginPage.submitEnabled(), 'Invaid ' + email).to.eventually.not.be.true;
    });

    loginHelper.loginPage.typeUsername('good@email.com');
    expect(loginHelper.loginPage.submitEnabled(), 'Valid email').to.eventually.be.true;
  });

  it('should not enable login if password is invalid ', function() {
    var invalidPasswords = ['', 'a', 'aa', 'aaaa'];

    loginHelper.ensureLoggedOut();
    loginHelper.navbarPage.login().click();
    loginHelper.loginPage.typeUsername('good@email.co');

    invalidPasswords.forEach(function (password) {
      loginHelper.loginPage.typePassword(password);
      expect(loginHelper.loginPage.submitEnabled()).to.eventually.not.be.true;
    });

    loginHelper.loginPage.typePassword('aGoodPassword');
    expect(loginHelper.loginPage.submitEnabled(), 'Valid password').to.eventually.be.true;
  });*/
});