'use strict';

var Page = require('./page');
function HomePage( a, b ) {
  Page.call( this, a, b );
}


//  this.nameInput = element(by.model('yourName'));
//  this.greeting = element(by.binding('yourName'));
//  this.usTabContent = element(by.css('[module=app-us] .tab-content'));
//  this.tabs = element.all(by.repeater('pane in panes'));

HomePage.prototype = Object.create( Page.prototype );

HomePage.prototype.footerAbout   = function() { return element(by.id('about-footer')); };
HomePage.prototype.footerContact = function() { return element(by.id('contact-footer')); };

module.exports = new HomePage('/', 'home');