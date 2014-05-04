'use strict';

var expect = require('./../test_helper.js').expect;
var loginHelper = require('./../helpers/login-helper.js');

describe('login page', function() {

  it('should load the home page', function() {
    loginHelper.homePage.get();
    expect(loginHelper.homePage.isLoaded()).to.eventually.be.true;
  });


  it('should login', function() {
    expect(loginHelper.isLoggedIn()).to.eventually.not.be.true;
    loginHelper.login('fred@jones.com', 'aPassword');
    expect(loginHelper.isLoggedIn()).to.eventually.be.true;
    expect(loginHelper.homePage.isLoaded()).to.eventually.be.true;
    expect(loginHelper.navbarPage.username().getText()).to.eventually.be.equal('fred@jones.com');
  });

  it('should login then logout ', function() {
    loginHelper.ensureLoggedIn('fred@jones.com', 'aPassword');
    expect(loginHelper.isLoggedIn(), 'loggedIn').to.eventually.be.true;
    loginHelper.logout();
    expect(loginHelper.isLoggedIn(), 'not isLoggedIn').to.eventually.not.be.true;
  });

  it('should not enable login if email is invalid ', function() {
    var invalidEmails = ['notemail', 'notemail@', 'notemail@@aa'];
    loginHelper.ensureLoggedOut();
    loginHelper.navbarPage.login().click();
    loginHelper.loginPage.passwordInput().clear();
    loginHelper.loginPage.passwordInput().sendKeys('aPassword');

    invalidEmails.forEach(function (email) {
      loginHelper.loginPage.usernameInput().clear();
      loginHelper.loginPage.usernameInput().sendKeys(email);
      expect(loginHelper.loginPage.submit().isEnabled(), 'Invaid ' + email).to.eventually.not.be.true;
    });

    loginHelper.loginPage.usernameInput().clear();
    loginHelper.loginPage.usernameInput().sendKeys('good@email.com');
    expect(loginHelper.loginPage.submit().isEnabled(), 'Valid email').to.eventually.be.true;
  });

  it('should not enable login if password is invalid ', function() {
    var invalidPasswords = ['', 'a', 'aa', 'aaaa'];

    loginHelper.ensureLoggedOut();
    loginHelper.navbarPage.login().click();
    loginHelper.loginPage.usernameInput().clear();
    loginHelper.loginPage.usernameInput().sendKeys('good@email.co');

    invalidPasswords.forEach(function (password) {
      loginHelper.loginPage.passwordInput().clear();
      loginHelper.loginPage.passwordInput().sendKeys(password);
      expect(loginHelper.loginPage.submit().isEnabled()).to.eventually.not.be.true;
    });

    loginHelper.loginPage.passwordInput().clear();
    loginHelper.loginPage.passwordInput().sendKeys('aGoodPassword');
    expect(loginHelper.loginPage.submit().isEnabled(), 'Valid password').to.eventually.be.true;
  });
});