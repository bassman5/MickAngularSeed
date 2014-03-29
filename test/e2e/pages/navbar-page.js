'use strict';

var NavbarPage = require('./page');
//  this.nameInput = element(by.model('yourName'));
//  this.greeting = element(by.binding('yourName'));
//  this.usTabContent = element(by.css('[module=app-us] .tab-content'));
//  this.tabs = element.all(by.repeater('pane in panes'));


NavbarPage.prototype.dropDownMemu = function() { return element(by.id('nav-dropdown')); };
NavbarPage.prototype.settings = function() { return element(by.id('settings-dropdown')); };

module.exports = new NavbarPage('/', 'Navbar');