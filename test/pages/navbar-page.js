'use strict';


var Page = require('./page');

function NavbarPage( a, b ) {
  Page.call( this, a, b );
}


//  this.nameInput = element(by.model('yourName'));
//  this.greeting = element(by.binding('yourName'));
//  this.usTabContent = element(by.css('[module=app-us] .tab-content'));
//  this.tabs = element.all(by.repeater('pane in panes'));

NavbarPage.prototype = Object.create( Page.prototype );
NavbarPage.prototype.dropDownMenu = function() { return element(by.id('nav-dropdown')); };
NavbarPage.prototype.settings = function() { return element(by.id('settings-dropdown')); };
NavbarPage.prototype.home = function() { return element(by.id('nav-home')); };
NavbarPage.prototype.about = function() { return element(by.id('nav-about')); };
NavbarPage.prototype.contact = function() { return element(by.id('nav-contact')); };
NavbarPage.prototype.login = function() { return element(by.id('nav-login')); };
NavbarPage.prototype.logout = function() { return element(by.id('nav-logout')); };
NavbarPage.prototype.register = function() { return element(by.id('nav-register')); };
NavbarPage.prototype.username        = function() { return element(by.id('nav-dropdown')); };
NavbarPage.prototype.isAuthenticated = function() {return this.dropDownMenu().isDisplayed(); };


module.exports = new NavbarPage ('/', 'Navbar');