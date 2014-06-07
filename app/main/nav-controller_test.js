'use strict';

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
    expect(!scope.isLoggedIn());
  });
});
