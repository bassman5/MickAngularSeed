'use strict';

describe('Api: Users', function () {

  var $httpBackend, Api, Users, Notification, Restangular;

  beforeEach(function() {
    module('anApp');
    inject(function($injector) {
      $httpBackend = $injector.get('$httpBackend');
      Users = $injector.get('Users');
      Api = $injector.get('Api');
      Restangular = $injector.get('Restangular');
      Notification = $injector.get('Notification');
    });
    spyOn(Notification, 'success').and.stub();
    spyOn(Notification, 'error'  ).and.stub();
  });

  afterEach(function() {
    $httpBackend.verifyNoOutstandingExpectation();
    $httpBackend.verifyNoOutstandingRequest();
  });

  it('should do something', function () {
    expect(!!Users).toBe(true);
  });

  it('should get the list of users', function () {
    $httpBackend.whenGET(/\/api\/v1\/users?.*/).respond(function(/* method, url */) {
      return [200, [{_id: 1}, {_id: 2}], {}];
    });

    Users.getList().then(function (data) {
      expect(data.length).toBe(2);
    });
    $httpBackend.flush();
  });


  it('should notify errors with message', function () {
    $httpBackend.whenGET(/\/api\/v1\/users?.*/).respond(function(/* method, url */) {
      return [400, {status: 'Error', message: 'Opps'}, {}];
    });

    Users.getList();
    $httpBackend.flush();
    expect(Notification.error).toHaveBeenCalled();
  });

  it('should notify not authorized', function () {
    $httpBackend.whenGET(/\/api\/v1\/users?.*/).respond(function(/* method, url */) {
      return [403, {status: 'Error', message: 'not allowed'}, {}];
    });

    Users.getList();
    $httpBackend.flush();
    expect(Notification.error).toHaveBeenCalled();
  });

  it('should notify errors with no message', function () {
    $httpBackend.whenGET(/\/api\/v1\/users?.*/).respond(function(/* method, url */) {
      return [400];
    });

    Users.getList();
    $httpBackend.flush();
    expect(Notification.error).toHaveBeenCalled();
  });


  it('should remove _id when put', function () {
    $httpBackend.whenGET(/\/api\/v1\/users?.*/).respond(function(/* method, url */) {
      return [200, {_id: 1, name: 'fred'}, {}];
    });
    $httpBackend.expectPUT(/\/api\/v1\/users?.*/, {'name':'jim'}).respond(201, '');

    Users.get(1).then(function(user) {
      user.name = 'jim';
      user.put();
    });
    $httpBackend.flush();
  });

  it('should extend user', function () {
    $httpBackend.whenGET(/\/api\/v1\/users?.*/).respond(function(/* method, url */) {
      return [200, {_id: 1, firstName: 'Fred', lastName: 'Smith'}, {}];
    });

    Users.get(1).then(function(user) {
      expect(user.fullName()).toEqual('Fred Smith');
    });
    $httpBackend.flush();
  });

});
