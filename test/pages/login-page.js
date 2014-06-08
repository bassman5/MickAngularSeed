'use strict';

var Page = require('./page');
function LoginPage( a, b ) {
  Page.call( this, a, b );
}


//  this.nameInput = element(by.model('yourName'));
//  this.greeting = element(by.binding('yourName'));
//  this.usTabContent = element(by.css('[module=app-us] .tab-content'));
//  this.tabs = element.all(by.repeater('pane in panes'));

LoginPage.prototype               = Object.create( Page.prototype );
LoginPage.prototype.submit        = function() { return element(by.id('login-button')); };
LoginPage.prototype.submitLogin   = function() { return this.submit().click(); };
LoginPage.prototype.errorMessage  = function() { return element(by.css('.alert-danger')).getText(); };
LoginPage.prototype.submitEnabled = function() { return this.submit().isEnabled(); };

LoginPage.prototype.usernameInput = function() { return element(by.model('credentials.username')); };
LoginPage.prototype.typeUsername  = function(username) {
  this.usernameInput().clear();
  return this.usernameInput().sendKeys(username);
};

LoginPage.prototype.passwordInput = function() { return element(by.model('credentials.password')); };
LoginPage.prototype.typePassword  = function(password) {
  this.passwordInput().clear();
  return this.passwordInput().sendKeys(password);
};

module.exports = new LoginPage('/login', 'login-view');
