'use strict';

var Page = require('./page');

function AboutPage( a, b ) {
  Page.call( this, a, b );
}


//  this.nameInput = element(by.model('yourName'));
//  this.greeting = element(by.binding('yourName'));
//  this.usTabContent = element(by.css('[module=app-us] .tab-content'));
//  this.tabs = element.all(by.repeater('pane in panes'));

AboutPage.prototype         = Object.create( Page.prototype );
AboutPage.prototype.contact = function() { return element(by.css('#about-view a')); };

module.exports = new AboutPage('/about', 'about-view');
