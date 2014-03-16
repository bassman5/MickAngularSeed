'use strict';

/*global element */
/*global by */
/*global browser */

function Page(url, el) {
  this.el = el;
  this.url = url;

//  this.setName = function(name) {
//    this.nameInput.sendKeys(name);
//  };
}


Page.prototype = {
  get:      function() { browser.get('#' + this.url); },
  content:  function() { return element(by.id(this.el)); },
  isLoaded: function() { return this.content().isPresent(); }
};

module.exports = Page;

