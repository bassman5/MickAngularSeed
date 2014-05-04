'use strict';

/*global describe */
/*global it */
/*global beforeEach */
/*global inject */
/*global expect */

describe('Controller: LogoutCtrl', function () {
  // load the controller's module

  var AuthenticationService,
    UserProfileService,
    LogoutCtrl,
    scope,
    $state,
    $httpBackend;

  beforeEach(function() {
    module('anApp');

    inject(function($injector, $controller, $rootScope, $q) {
      var promised = function () {
        var q = $q.defer();
        q.resolve();
        return q.promise;
      };

      $httpBackend          = $injector.get('$httpBackend');
      AuthenticationService = $injector.get('AuthenticationService');
      UserProfileService    = $injector.get('UserProfileService');
      $state                = $injector.get('$state');


      spyOn(AuthenticationService, 'logout').and.callFake(promised);
      spyOn(UserProfileService, 'logout').and.callFake(promised);
      spyOn($state, 'go').and.stub();

      scope         = $rootScope.$new();

      LogoutCtrl = $controller('LogoutCtrl', {
        $scope:                scope
      });
    });


  });

  it('should call AuthenticationService logout', function() {
    $httpBackend.whenGET('main/main.html').respond(function(/* method, url */) {
      return [200];
    });

    // Don't need to call logout, constructing controller calls logout()
    scope.$apply();

    expect(AuthenticationService.logout.calls.count()).toEqual(1);
    expect(UserProfileService.logout.calls.count()).toEqual(1);
    expect($state.go.calls.count()).toEqual(1);
    expect($state.go).toHaveBeenCalledWith('main');


  });

});
