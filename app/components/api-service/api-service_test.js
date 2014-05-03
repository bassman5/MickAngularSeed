'use strict';

/*global describe */
/*global it */
/*global beforeEach */
/*global afterEach */
/*global inject */
/*global expect */

/* global sinon: false */
/* jshint -W030 */

describe('Service: Api', function () {

  var $httpBackend, Api, notificationApi, Restangular;

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
      Api = $injector.get('Api');
      Restangular = $injector.get('Restangular');
    });
  });

  afterEach(function() {
    $httpBackend.verifyNoOutstandingExpectation();
    $httpBackend.verifyNoOutstandingRequest();
  });

  it('should do something', function () {
    expect(!!Api).to.equal(true);
  });

  it('should have configuration', function () {
    expect(!!Api.configuration).to.equal(true);
  });
});
