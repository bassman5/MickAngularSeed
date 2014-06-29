'use strict';

describe('Service: UserProfileService', function () {


  var UserProfileService, $httpBackend, $rootScope, $http, CONST, serviceUrl;
  beforeEach(function() {
    module('anApp');

    inject(function($injector) {
      $httpBackend          = $injector.get('$httpBackend');
      $http                 = $injector.get('$http');
      UserProfileService    = $injector.get('UserProfileService');
      CONST                 = $injector.get('CONST');
      $rootScope            = $injector.get('$rootScope');
    });
    serviceUrl = CONST.API.BASE_URL + '/' + CONST.API.USER_PROFILE;

  });

  afterEach(function() {
    $httpBackend.verifyNoOutstandingExpectation();
    $httpBackend.verifyNoOutstandingRequest();
  });


  it('should return current user (default is empty)', function () {
    expect(UserProfileService.user()).toEqual({});
    expect(UserProfileService.isLoggedIn()).not.toEqual(true);
  });


  it('should get the current user', function () {
    $httpBackend.whenGET(serviceUrl).respond(function(/* method, url */) {
      return [200, {_id: 1, firstName: 'Fred', lastName: 'Smith'}, {}];
    });

    UserProfileService.getCurrentUser().then (function () {
      expect(UserProfileService.user().fullName()).toEqual('Fred Smith');
      expect(UserProfileService.isLoggedIn()).toEqual(true);
    });

    $httpBackend.flush();
  });

  it('should logout', function () {
    $httpBackend.whenGET(serviceUrl).respond(function(/* method, url */) {
      return [200, {_id: 1, firstName: 'Fred', lastName: 'Smith'}, {}];
    });

    UserProfileService.getCurrentUser().then (function () {
      expect(UserProfileService.user().fullName()).toEqual('Fred Smith');
      UserProfileService.logout();
      expect(UserProfileService.user()).toEqual({});
    });

    $httpBackend.flush();
  });
});
