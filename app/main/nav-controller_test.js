'use strict';

/*global describe */
/*global it */
/*global beforeEach */
/*global inject */
/*global expect */

describe('Controller: NavCtrl', function () {

  var NavCtrl,
    scope,
    stateProvider;

  beforeEach(function() {
    module('anApp');

    inject(function($injector, $controller, $rootScope) {
      stateProvider = $injector.get('$state');
      scope = $rootScope.$new();
      NavCtrl = $controller('NavCtrl', {
        $scope: scope
      });
    });
  });

  it('should call UserProfileService.login', function () {
    expect(scope.isLoggedIn()).to.not.be.ok;
  });
});
