'use strict';

angular.module('e2e-mocks', ['ngMockE2E'])
  .run(['$httpBackend', 'CONST', function ($httpBackend, CONST) {
    // Mocking code used for simulation purposes (using ngMockE2E module)
    var authorized = false;
    var customers = [
      {name: 'John Smith'},
      {name: 'Tim Johnson'}
    ];

    // returns the current list of customers or a 401 depending on authorization flag
    $httpBackend.whenGET('/customers').respond(function (/* method, url, data, headers */) {
      return authorized ? [200, customers] : [401];
    });

    $httpBackend.whenGET(CONST.AUTH.URL.USER_PROFILE).respond(function () {
      return authorized ? [200, {id: 1, firstName: 'Fred', lastName: 'Jones', username: 'fred@jones.com'}] : [401];
    });


    $httpBackend.whenPOST('/login').respond(function () {
      authorized = true;
      return  [200 , { authorizationToken: 'NjMwNjM4OTQtMjE0Mi00ZWYzLWEzMDQtYWYyMjkyMzNiOGIy' } ];
    });

    $httpBackend.whenPOST('/logout').respond(function () {
      authorized = false;
      return [200];
    });

    // All other http requests will pass through
    $httpBackend.whenGET(/.*/).passThrough();

  }]);

if (window.index) {
  angular.module('anApp').requires.push('e2e-mocks');
}
