'use strict';

/*global describe */
/*global it */
/*global beforeEach */
/*global inject */
/*global expect */

describe('Service: Config', function () {

  // load the service's module
  beforeEach(module('anApp'));

  // instantiate service
  var Config;
  beforeEach(inject(function (_Config_) {
    Config = _Config_;
  }));

  it('should return APP_VERSION', function () {
    expect(Config.APP_VERSION).toBe(0.1);
  });

});
