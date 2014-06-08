'use strict';

describe('Controller: LoginCtrl', function () {
  // load the controller's module

  var $httpBackend,
    LoginCtrl,
    scope,
    $state,
    AuthenticationService,
    UserProfileService,
    promised,
    promiseFailed,
    promiseFailedNoMsg;

  beforeEach(function() {
    module('anApp');

    inject(function($injector, $controller, $rootScope, $q) {
      promised = function () {
        var q = $q.defer();
        q.resolve();
        return q.promise;
      };

      promiseFailed = function () {
        var q = $q.defer();
        q.reject({message: 'Login credentials invalid'});
        return q.promise;
      };

      promiseFailedNoMsg = function () {
        var q = $q.defer();
        q.reject();
        return q.promise;
      };

      $httpBackend          = $injector.get('$httpBackend');
      AuthenticationService = $injector.get('AuthenticationService');
      UserProfileService    = $injector.get('UserProfileService');
      $state                = $injector.get('$state');


      spyOn(UserProfileService, 'getCurrentUser').and.callFake(promised);
      spyOn($state, 'go').and.stub();

      scope         = $rootScope.$new();

      LoginCtrl = $controller('LoginCtrl', {
        $scope:                scope
      });
    });


  });

  it('should call AuthenticationService login', function() {
    var user = {username: 'fred@email.com', password: 'Password'};
    spyOn(AuthenticationService, 'login').and.callFake(promised);
    $httpBackend.whenGET('main/main.html').respond(function(/* method, url */) {
      return [200];
    });

    scope.login(user);
    scope.$apply();

    expect(AuthenticationService.login.calls.count()).toEqual(1);
    expect(AuthenticationService.login).toHaveBeenCalledWith(user);
    expect(UserProfileService.getCurrentUser.calls.count()).toEqual(1);
    expect($state.go.calls.count()).toEqual(1);
    expect($state.go).toHaveBeenCalledWith('dashboard');
  });


  it('should return error message when AuthenticationService fails', function() {
    var user = {username: 'fred@email.com', password: 'aPassword'};
    spyOn(AuthenticationService, 'login').and.callFake(promiseFailed);
    $httpBackend.whenGET('main/main.html').respond(function(/* method, url */) {
      return [200];
    });

    scope.login(user);
    scope.$apply();

    expect(AuthenticationService.login.calls.count()).toEqual(1);
    expect(AuthenticationService.login).toHaveBeenCalledWith(user);
    expect(scope.error).toEqual('Login credentials invalid');
    expect($state.go.calls.count()).toEqual(0);
  });


  it('should return default error message when AuthenticationService fails', function() {
    var user = {username: 'fred@email.com', password: 'aPassword'};
    spyOn(AuthenticationService, 'login').and.callFake(promiseFailedNoMsg);
    $httpBackend.whenGET('main/main.html').respond(function(/* method, url */) {
      return [200];
    });

    scope.login(user);
    scope.$apply();

    expect(AuthenticationService.login.calls.count()).toEqual(1);
    expect(AuthenticationService.login).toHaveBeenCalledWith(user);
    expect(scope.error).toEqual('Invalid login');
    expect($state.go.calls.count()).toEqual(0);
  });


});
