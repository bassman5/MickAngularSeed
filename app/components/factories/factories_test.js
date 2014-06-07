'use strict';

describe('factories: ', function () {

  // load the service's module
  beforeEach(module('anApp'));

  it('should get an instance of the lodash factory', inject(function(_) {
    expect(_).not.toEqual(undefined);
  }));
});
