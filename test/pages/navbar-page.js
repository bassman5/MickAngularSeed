'use strict';

var NavbarPage = require('./page');
//  this.nameInput = element(by.model('yourName'));
//  this.greeting = element(by.binding('yourName'));
//  this.usTabContent = element(by.css('[module=app-us] .tab-content'));
//  this.tabs = element.all(by.repeater('pane in panes'));


NavbarPage.prototype.dropDownMemu = function() { return element(by.id('nav-dropdown')); };
NavbarPage.prototype.settings = function() { return element(by.id('settings-dropdown')); };
NavbarPage.prototype.home = function() { return element(by.id('nav-home')); };
NavbarPage.prototype.login = function() { return element(by.id('nav-login')); };
NavbarPage.prototype.logout = function() { return element(by.id('nav-logout')); };
NavbarPage.prototype.register = function() { return element(by.id('nav-register')); };
NavbarPage.prototype.username        = function() { return element(by.id('nav-username')); };


module.exports = new NavbarPage('/', 'Navbar');