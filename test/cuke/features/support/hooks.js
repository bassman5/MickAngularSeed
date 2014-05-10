'use strict';

var chai = require('chai');
var chaiAsPromised = require('chai-as-promised');
chai.use(chaiAsPromised);

var expect = chai.expect;
var stepCount = 0;

var myHooks = function () {
  this.Before(function(callback) {
    // Just like inside step definitions, "this" is set to a World instance.
    // It's actually the same instance the current scenario step definitions
    // will receive.

    // Let's say we have a bunch of "maintenance" methods available on our World
    // instance, we can fire some to prepare the application for the next
    // scenario:

    // This needs to be the last
    if (stepCount === 0) {
      stepCount++;
      this.HomePage.get('/');
      expect(this.HomePage.isLoaded()).to.eventually.equal(true);
    }
    else {
      this.goHome();
    }
    callback();
  });
};

module.exports = myHooks;