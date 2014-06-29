'use strict';

describe('Service: Api', function () {

  var Api, CONST;

  beforeEach(function() {
    module('anApp');

    inject(function($injector) {
      Api = $injector.get('Api');
      CONST = $injector.get('CONST');
    });
  });


  it('should do something', function () {
    expect(!!Api).toBe(true);
  });

  it('should have configuration', function () {
    expect(Api.configuration.baseUrl).toEqual(CONST.API.BASE_URL);
  });
});
