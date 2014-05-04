'use strict';

/*global describe */
/*global it */
/*global beforeEach */
/*global afterEach */
/*global inject */
/*global expect */

/* jshint -W030 */

describe('Api: UserProfile', function () {

  var $httpBackend, Api, UserProfile, notificationApi, Restangular;

  beforeEach(function() {
    module('anApp');
    notificationApi = {
      success:  jasmine.createSpy('success'),
      error:    jasmine.createSpy('error')
    };

    module(function ($provide) {
      $provide.value('Notification', notificationApi);
    });

    inject(function($injector) {
      $httpBackend = $injector.get('$httpBackend');
      UserProfile = $injector.get('UserProfile');
      Api         = $injector.get('Api');
      Restangular = $injector.get('Restangular');
    });
  });

  afterEach(function() {
    $httpBackend.verifyNoOutstandingExpectation();
    $httpBackend.verifyNoOutstandingRequest();
  });

  it('should do something', function () {
    expect(!!UserProfile).toBe(true);
  });

  it('should notify errors with message', function (done) {
    $httpBackend.whenGET(/\/api\/v1\/user-profile?.*/).respond(function(/* method, url */) {
      return [400, {status: 'Error', message: 'Opps'}, {}];
    });

    UserProfile.getList().then(function (data) {
      expect(data.length).toBe(2);
      done();
    });
    $httpBackend.flush();
    expect(notificationApi.error).toHaveBeenCalled();
    done();
  });

  it('should notify errors with no message', function (done) {
    $httpBackend.whenGET(/\/api\/v1\/user-profile?.*/).respond(function(/* method, url */) {
      return [400];
    });

    UserProfile.getList().then(function (data) {
      expect(data.length).toBe(2);
      done();
    });
    $httpBackend.flush();
    expect(notificationApi.error).toHaveBeenCalled();

    done();
  });


  it('should remove _id when put and patch', function () {
    $httpBackend.whenGET(/\/api\/v1\/user-profile?.*/).respond(function(/* method, url */) {
      return [200, {_id: 1, firstName: 'fred', lastName: 'Smith'}, {}];
    });
    $httpBackend.expectPATCH(/\/api\/v1\/user-profile?.*/, {'firstName':'Jim'}).respond(201, '');

    UserProfile.get(1).then(function(user) {
      user.firstName = 'Jim';
      delete user.lastName;
      user.patch();
    });
    $httpBackend.flush();
  });

  it('should extend user', function () {
    $httpBackend.whenGET(/\/api\/v1\/user-profile?.*/).respond(function(/* method, url */) {
      return [200, {_id: 1, firstName: 'Fred', lastName: 'Smith'}, {}];
    });

    UserProfile.get(1).then(function(user) {
      expect(user.fullName()).toEqual('Fred Smith');
    });
    $httpBackend.flush();
  });

});
