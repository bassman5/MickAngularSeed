'use strict';

/*global describe */
/*global it */
/*global beforeEach */
/*global inject */
/*global expect */
/*global sinon */

describe('Service: AuthenticationService', function () {


  var AuthenticationService, $httpBackend, $rootScope, authService, loginConfirmed, broadcast, $http, Config, AUTH;
  beforeEach(function() {
    module('anApp');

    inject(function($injector) {
      $httpBackend          = $injector.get('$httpBackend');
      $http                 = $injector.get('$http');
      AuthenticationService = $injector.get('AuthenticationService');
      authService           = $injector.get('authService');
      $rootScope            = $injector.get('$rootScope');
      Config                = $injector.get('Config');
      AUTH                  = $injector.get('AUTH');
    });

    loginConfirmed = sinon.spy(authService, 'loginConfirmed');
    broadcast = sinon.spy($rootScope, '$broadcast');
  });

  afterEach(function() {
    $httpBackend.verifyNoOutstandingExpectation();
    $httpBackend.verifyNoOutstandingRequest();
  });

  function loginSuccessfully() {
    var response = { authorizationToken: 'abcdefghijk' };

    $httpBackend.whenPOST(AUTH.URL.LOGIN).respond(function(/* method, url */) {
      return  [200 , response ];
    });
    AuthenticationService.login({user: 'fred', password: 'Password'});
  }

  function loginSuccessCheck() {
    expect(loginConfirmed.should.have.been.calledOnce).to.be.ok;
    expect(broadcast.should.have.been.calledWith(AUTH.EVENTS.loginSuccess)).to.be.ok;
    expect(AuthenticationService.isAuthenticated()).to.be.ok;
  }

  function loginFailedCheck() {
    expect(broadcast.should.have.been.calledWith(AUTH.EVENTS.loginFailed, 401, { error: 'Invalid login details' })).to.be.ok;
    expect(loginConfirmed.should.have.been.notCalled).to.not.be.ok;
    expect(AuthenticationService.isAuthenticated()).to.not.be.ok;
  }


  it('should login successfully', function () {
    loginSuccessfully();
    $httpBackend.flush();
    loginSuccessCheck();
  });


  it('should handle login failed', function () {

    $httpBackend.whenPOST(AUTH.URL.LOGIN).respond(function(/* method, url */) {
      return  [401 , {error: 'Invalid login details'} ];
    });

    AuthenticationService.login({user: 'fred', password: 'bad'});
    $httpBackend.flush();
    loginFailedCheck();
  });

  it('should logout successfully', function () {
    $httpBackend.whenPOST(/\/logout?.*/).respond(function(/* method, url */) {
      return  [200 , {} ];
    });
    loginSuccessfully();
    $httpBackend.flush();
    loginSuccessCheck();
    AuthenticationService.logout();
    $httpBackend.flush();
    expect(AuthenticationService.isAuthenticated()).to.not.be.ok;
    expect(broadcast.should.have.been.calledWith(AUTH.EVENTS.logoutSuccess)).to.be.ok;
  });

  it('should cancel a login attempt', function () {
    loginSuccessfully();
    AuthenticationService.loginCancelled();
    expect(AuthenticationService.isAuthenticated()).to.not.be.ok;
    $httpBackend.flush();
  });

  it('should redirect to login for a protected get then retry the protected page and return data successfully', function (done) {
    var authorizationToken = 'abcdefghijk', response = { authorizationToken: authorizationToken };

    $httpBackend.whenGET(/\/protected?.*/).respond(function(method, url, data, headers) {
      if (headers.Authorization === authorizationToken) {
        return [200, 'OK'];
      }
      else {
        return  [401 , {error: 'You are not allowed to see this'} ];
      }
    });

    $httpBackend.whenPOST(AUTH.URL.LOGIN).respond(function(/* method, url */) {
      return  [200 , response ];
    });

    $rootScope.$on(AUTH.EVENTS.notAuthenticated, function(/* e, rejection */) {
      AuthenticationService.login({user: 'fred', password: 'Password'});
    });

    $http.get('/protected').success(function (data /* , status, headers, config */) {
      expect(data).to.be.equal('OK');
      done();
    });

    $httpBackend.flush();
    loginSuccessCheck();
  });

  it('should redirect to login for a protected page but fail if the login failed', function () {
    var authorizationToken = 'abcdefghijk';

    $httpBackend.whenGET(/\/protected?.*/).respond(function(method, url, data, headers) {
      if (headers.Authorization === authorizationToken) {
        return [200, 'OK'];
      }
      else {
        return  [401 , {error: 'You are not allowed to see this'} ];
      }
    });
    $httpBackend.whenPOST(AUTH.URL.LOGIN).respond(function(/* method, url */) {
      return  [401 , {error: 'Invalid login details'} ];
    });

    $rootScope.$on(AUTH.EVENTS.notAuthenticated, function(/* e, rejection */ ) {
      AuthenticationService.login({user: 'fred', password: 'Password'});
    });

    $http.get('/protected');

    $httpBackend.flush();

    loginFailedCheck();
  });



  it('should redirect to login for a protected post then retry the protected post with the original data and return data successfully', function (done) {
    var authorizationToken = 'abcdefghijk', response = { authorizationToken: authorizationToken };

    $httpBackend.whenPOST(/\/protected?.*/).respond(function(method, url, _data, headers) {
      if (headers.Authorization === authorizationToken) {
        var data = JSON.parse(_data);
        if (data.p1 === 'data1' && data.p2 === 'data2') {
          return [200, 'OK'];
        }
        else {
          return [404, 'not found'];
        }
      }
      else {
        return  [401 , {error: 'You are not allowed to see this'} ];
      }
    });
    $httpBackend.whenPOST(AUTH.URL.LOGIN).respond(function(/* method, url */) {
      return  [200 , response ];
    });

    $rootScope.$on(AUTH.EVENTS.notAuthenticated, function(/* e, rejection */) {
      AuthenticationService.login({user: 'fred', password: 'Password'});
    });

    $http.post('/protected', {p1: 'data1', p2: 'data2'})
      .success(function (data /*, status, headers, config */) {
        expect(data).to.be.equal('OK');

        loginSuccessCheck();
        done();
      });

    $httpBackend.flush();
  });
});
