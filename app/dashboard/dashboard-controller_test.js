'use strict';

/*global describe */
/*global it */
/*global beforeEach */
/*global inject */
/*global expect */

describe('Controller: DashboardCtrl', function () {

  // load the controller's module
  beforeEach(module('anApp'));

  var AboutCtrl,
    scope;

  // Initialize the controller and a mock scope
  beforeEach(inject(function ($controller, $rootScope) {
    scope = $rootScope.$new();
    AboutCtrl = $controller('DashboardCtrl', {
      $scope: scope
    });
  }));

  it('should attach a list of awesomeThings to the scope', function () {
    expect(scope.awesomeThings.length).toBe(3);
  });
});
