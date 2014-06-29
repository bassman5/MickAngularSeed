'use strict';

describe('Service: Config', function () {

  var CONST;

  beforeEach(function() {
    module('anApp');

    inject(function($injector) {
      CONST = $injector.get('CONST');
    });
  });

  it('should return a constant', function () {
    expect(!!CONST.API.BASE_URL).toBe(true);
  });

});
