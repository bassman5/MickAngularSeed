'use strict';

function Page(url, el) {
  this.el = el;
  this.url = url;
}


Page.prototype = {
  get:      function() { return browser.get('#' + this.url); },
  content:  function() { return element(by.id(this.el)); },
  isLoaded: function() { return this.content().isPresent(); }
};

module.exports = Page;

