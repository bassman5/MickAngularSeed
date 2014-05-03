'use strict';

/*global describe */
/*global it */
/*global beforeEach */
/*global afterEach */
/*global inject */
/*global expect */

/* global sinon: false */
/* jshint -W030 */

describe('Api: Users', function () {

  var $httpBackend, Api, Users, notificationApi, Restangular;

  beforeEach(function() {
    module('anApp');
    notificationApi = { success: sinon.stub(),
      error: sinon.stub()
    };

    module(function ($provide) {
      $provide.value('Notification', notificationApi);
    });

    inject(function($injector) {
      $httpBackend = $injector.get('$httpBackend');
      Users = $injector.get('Users');
      Api = $injector.get('Api');
      Restangular = $injector.get('Restangular');
    });
  });

  afterEach(function() {
    $httpBackend.verifyNoOutstandingExpectation();
    $httpBackend.verifyNoOutstandingRequest();
  });

  it('should do something', function () {
    expect(!!Users).to.equal(true);
  });

  it('should get the list of users', function (done) {
    $httpBackend.whenGET(/\/api\/v1\/users?.*/).respond(function(/* method, url */) {
      return [200, [{_id: 1}, {_id: 2}], {}];
    });

    Users.getList().then(function (data) {
      expect(data.length).to.equal(2);
      done();
    });
    $httpBackend.flush();
  });


  it('should notify errors with message', function () {
    $httpBackend.whenGET(/\/api\/v1\/users?.*/).respond(function(/* method, url */) {
      return [400, {status: 'Error', message: 'Opps'}, {}];
    });

    Users.getList();
    $httpBackend.flush();
    expect(notificationApi.error.should.have.been.calledOnce).to.be.ok;
  });

  it('should notify not authorized', function () {
    $httpBackend.whenGET(/\/api\/v1\/users?.*/).respond(function(/* method, url */) {
      return [403, {status: 'Error', message: 'not allowed'}, {}];
    });

    Users.getList();
    $httpBackend.flush();
    expect(notificationApi.error.should.have.been.calledOnce).to.be.ok;
  });

  it('should notify errors with no message', function () {
    $httpBackend.whenGET(/\/api\/v1\/users?.*/).respond(function(/* method, url */) {
      return [400];
    });

    Users.getList();
    $httpBackend.flush();
    expect(notificationApi.error.should.have.been.calledOnce).to.be.ok;
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
      expect(user.fullName()).to.be.equal('Fred Smith');
    });
    $httpBackend.flush();
  });

});
