'use strict';

var AboutPage = require('./page');
//  this.nameInput = element(by.model('yourName'));
//  this.greeting = element(by.binding('yourName'));
//  this.usTabContent = element(by.css('[module=app-us] .tab-content'));
//  this.tabs = element.all(by.repeater('pane in panes'));

AboutPage.prototype.contact = function() { return element(by.css('#about-view a')); };

module.exports = new AboutPage('/about', 'about-view');
