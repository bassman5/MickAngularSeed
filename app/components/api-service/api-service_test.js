'use strict';

/*global describe */
/*global it */
/*global beforeEach */
/*global inject */
/*global expect */

describe('Service: Api', function () {

  var Api;

  beforeEach(function() {
    module('anApp');


    inject(function($injector) {
      Api = $injector.get('Api');
    });
  });


  it('should do something', function () {
    expect(!!Api).toBe(true);
  });

  it('should have configuration', function () {
    expect(!!Api.configuration).toBe(true);
  });
});
