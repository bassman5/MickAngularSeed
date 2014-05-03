'use strict';

/*global describe */
/*global it */
/*global beforeEach */
/*global inject */
/*global expect */

describe('Service: UserProfileService', function () {


  var UserProfileService, $httpBackend, $rootScope, $http, Config;
  beforeEach(function() {
    module('anApp');

    inject(function($injector) {
      $httpBackend          = $injector.get('$httpBackend');
      $http                 = $injector.get('$http');
      UserProfileService    = $injector.get('UserProfileService');
      $rootScope            = $injector.get('$rootScope');
      Config                = $injector.get('Config');
    });
  });

  afterEach(function() {
    $httpBackend.verifyNoOutstandingExpectation();
    $httpBackend.verifyNoOutstandingRequest();
  });


  it('should return current user (default is empty)', function () {
    expect(UserProfileService.user()).to.be.eql({});
    expect(UserProfileService.isLoggedIn()).to.not.be.ok;
  });


  it('should get the current user', function (done) {
    $httpBackend.whenGET(/\/api\/v1\/user-profile?.*/).respond(function(/* method, url */) {
      return [200, {_id: 1, firstName: 'Fred', lastName: 'Smith'}, {}];
    });

    UserProfileService.getCurrentUser().then (function () {
      expect(UserProfileService.user().fullName()).to.be.equal('Fred Smith');
      expect(UserProfileService.isLoggedIn()).to.be.ok;
      done();
    });

    $httpBackend.flush();
  });

  it('should logout', function (done) {
    $httpBackend.whenGET(/\/api\/v1\/user-profile?.*/).respond(function(/* method, url */) {
      return [200, {_id: 1, firstName: 'Fred', lastName: 'Smith'}, {}];
    });

    UserProfileService.getCurrentUser().then (function () {
      expect(UserProfileService.user().fullName()).to.be.equal('Fred Smith');
      UserProfileService.logout();
      expect(UserProfileService.user()).to.be.eql({});
      done();
    });

    $httpBackend.flush();
  });
});
