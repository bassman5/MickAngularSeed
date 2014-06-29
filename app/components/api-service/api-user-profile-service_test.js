'use strict';

describe('Api: UserProfile', function () {

  var $httpBackend, CONST, UserProfile, Notification, serviceUrl;

  beforeEach(function() {
    module('anApp');

    inject(function($injector) {
      $httpBackend = $injector.get('$httpBackend');
      UserProfile  = $injector.get('UserProfile');
      CONST        = $injector.get('CONST');
      Notification = $injector.get('Notification');
    });
    serviceUrl = CONST.API.BASE_URL + '/' + CONST.API.USER_PROFILE;
    spyOn(Notification, 'success').and.stub();
    spyOn(Notification, 'error'  ).and.stub();
  });

  afterEach(function() {
    $httpBackend.verifyNoOutstandingExpectation();
    $httpBackend.verifyNoOutstandingRequest();
  });

  it('should do something', function () {
    expect(!!UserProfile).toBe(true);
  });

  it('should return the user\'s details', function () {
    $httpBackend.whenGET(serviceUrl).respond(function(/* method, url */) {
      return [200, {_id: 1, firstName: 'Fred', lastName: 'Smith'}, {}];
    });

    UserProfile.get('').then(function(user) {
      expect(user.firstName).toEqual('Fred');
      expect(user.lastName).toEqual('Smith');
    });
    $httpBackend.flush();
  });

  it('should report error messages on failure', function () {
    $httpBackend.whenGET(serviceUrl + '/1').respond(function(/* method, url */) {
      return [400, {status: 'Error', message: 'Opps'}, {}];
    });

    UserProfile.get(1);
    $httpBackend.flush();
    expect(Notification.error).toHaveBeenCalledWith('Opps');
  });

  it('should return an extended user', function () {
    var id = 45678,
      testUrl = serviceUrl + '/' + id;

    $httpBackend.whenGET(testUrl).respond(function(/* method, url */) {
      return [200, {_id: id, firstName: 'Fred', lastName: 'Smith'}, {}];
    });

    UserProfile.get(id).then(function(user) {
      expect(user.fullName()).toEqual('Fred Smith');
    });
    $httpBackend.flush();
  });

  it('should notify errors with no message', function () {
    $httpBackend.whenGET(serviceUrl + '/1').respond(function(/* method, url */) {
      return [400];
    });

    UserProfile.get(1);
    $httpBackend.flush();
    expect(Notification.error).toHaveBeenCalledWith('Server error');
  });

  it('should notify errors with null message', function () {
    $httpBackend.whenGET(serviceUrl + '/1').respond(function(/* method, url */) {
      return [400, { message: null}, {}];
    });

    UserProfile.get(1);
    $httpBackend.flush();
    expect(Notification.error).toHaveBeenCalledWith('Server error');
  });


  it('should remove _id when put and patch', function () {
    var id = 23456,
      testUrl = serviceUrl + '/' + id;

    $httpBackend.whenGET(new RegExp(testUrl + '?.*', 'g')).respond(function(/* method, url */) {
      return [200, {_id: id, firstName: 'fred', lastName: 'Smith'}, {}];
    });
    $httpBackend.expectPUT(testUrl, {'firstName':'Jim', 'lastName': 'Smith'}).respond(201, '');
    $httpBackend.expectPATCH(testUrl, {'firstName':'Jim'}).respond(201, '');

    UserProfile.get(id).then(function(user) {
      user.firstName = 'Jim';
      user.put();
      delete user.lastName;
      user.patch();
    });
    $httpBackend.flush();
  });

});