'use strict';

/*global describe */
/*global it */
/*global beforeEach */
/*global inject */
/*global expect */

describe('Controller: MainCtrl', function () {
  // load the controller's module
  beforeEach(module('anApp'));

  var MainCtrl,
    scope,
    stateProvider;

  beforeEach(inject(function($injector) {
    stateProvider = $injector.get('$state');
  }));

  // Initialize the controller and a mock scope
  beforeEach(inject(function ($controller, $rootScope) {
    scope = $rootScope.$new();
    MainCtrl = $controller('MainCtrl', {
      $scope: scope
    });
  }));

  it('should attach a list of awesomeThings to the scope', function () {
    expect(scope.awesomeThings.length).to.equal(3);
  });
});
