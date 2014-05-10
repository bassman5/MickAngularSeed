'use strict';

var Page = require('./page');
function SettingsPage( a, b ) {
  Page.call( this, a, b );
}


//  this.nameInput = element(by.model('yourName'));
//  this.greeting = element(by.binding('yourName'));
//  this.usTabContent = element(by.css('[module=app-us] .tab-content'));
//  this.tabs = element.all(by.repeater('pane in panes'));

SettingsPage.prototype         = Object.create( Page.prototype );
SettingsPage.prototype.contact = function() { return element(by.css('#Settings-view a')); };

module.exports = new SettingsPage('/settings', 'settings-view');
