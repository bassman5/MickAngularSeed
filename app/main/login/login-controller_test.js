'use strict';

describe('Controller: LoginCtrl', function () {
  // load the controller's module

  var $httpBackend,
    LoginCtrl,
    scope,
    $state,
    AuthenticationService,
    UserProfileService;

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


      spyOn(AuthenticationService, 'login').and.callFake(promised);
      spyOn(UserProfileService, 'getCurrentUser').and.callFake(promised);
      spyOn($state, 'go').and.stub();

      scope         = $rootScope.$new();

      LoginCtrl = $controller('LoginCtrl', {
        $scope:                scope
      });
    });


  });

  it('should call AuthenticationService login', function() {
    var user = {username: 'fred@email.com', password: 'aPassword'};
    $httpBackend.whenGET('main/main.html').respond(function(/* method, url */) {
      return [200];
    });

    scope.login(user);
    scope.$apply();

    expect(AuthenticationService.login.calls.count()).toEqual(1);
    expect(AuthenticationService.login).toHaveBeenCalledWith(user);
    expect(UserProfileService.getCurrentUser.calls.count()).toEqual(1);
    expect($state.go.calls.count()).toEqual(1);
    expect($state.go).toHaveBeenCalledWith('main');
  });

});
