'use strict';

var ContactPage = require('./page');
//  this.nameInput = element(by.model('yourName'));
//  this.greeting = element(by.binding('yourName'));
//  this.usTabContent = element(by.css('[module=app-us] .tab-content'));
//  this.tabs = element.all(by.repeater('pane in panes'));

ContactPage.prototype.about = function() { return element(by.css('#contact-view a')); };

module.exports = new ContactPage('/contact', 'contact-view');
