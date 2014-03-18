'use strict';

/*global describe */
/*global it */
/*global beforeEach */
/*global inject */
/*global expect */

describe('Controller: SettingsCtrl', function () {

  // load the controller's module
  beforeEach(module('anApp'));

  var SettingsCtrl,
    scope;

  // Initialize the controller and a mock scope
  beforeEach(inject(function ($controller, $rootScope) {
    scope = $rootScope.$new();
    SettingsCtrl = $controller('SettingsCtrl', {
      $scope: scope
    });
  }));

  it('should attach a list of awesomeThings to the scope', function () {
    expect(scope.awesomeThings.length).to.equal(3);
  });
});
