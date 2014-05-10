'use strict';

var Page = require('./page');
function ContactPage( a, b ) {
  Page.call( this, a, b );
}


//  this.nameInput = element(by.model('yourName'));
//  this.greeting = element(by.binding('yourName'));
//  this.usTabContent = element(by.css('[module=app-us] .tab-content'));
//  this.tabs = element.all(by.repeater('pane in panes'));

ContactPage.prototype = Object.create( Page.prototype );
ContactPage.prototype.about = function() {
  return element(by.css('#contact-view a'));
};

module.exports = new ContactPage('/contact', 'contact-view');
