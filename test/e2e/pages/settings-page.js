'use strict';

var SettingsPage = require('./page');
//  this.nameInput = element(by.model('yourName'));
//  this.greeting = element(by.binding('yourName'));
//  this.usTabContent = element(by.css('[module=app-us] .tab-content'));
//  this.tabs = element.all(by.repeater('pane in panes'));

//SettingsPage.prototype.contact = function() { return element(by.css('#Settings-view a')); };

module.exports = new SettingsPage('/settings', 'settings-view');
