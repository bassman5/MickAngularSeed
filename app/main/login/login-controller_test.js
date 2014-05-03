'use strict';

/*global describe */
/*global it */
/*global beforeEach */
/*global inject */
/*global expect */
/*global sinon */

describe('Controller: LoginCtrl', function () {
  // load the controller's module

  var AuthenticationServiceMock,
    UserProfileServiceMock,
    LoginCtrl,
    scope,
    stateMock;

  beforeEach(function() {
    module('anApp');

    inject(function($injector, $controller, $rootScope, $q) {
      var promised = function () {
        var q = $q.defer();
        q.resolve();
        return q.promise;
      };

      AuthenticationServiceMock = {login: function() {}};
      sinon.stub(AuthenticationServiceMock, 'login').returns(promised());

      UserProfileServiceMock = {getCurrentUser: function() {}};
      sinon.stub(UserProfileServiceMock, 'getCurrentUser').returns(promised());

      stateMock = {go: function() {}};
      sinon.stub(stateMock, 'go');

      scope         = $rootScope.$new();

      LoginCtrl = $controller('LoginCtrl', {
        $scope:                scope,
        AuthenticationService: AuthenticationServiceMock,
        UserProfileService:    UserProfileServiceMock,
        $state:                stateMock
      });
    });


  });

  it('should call AuthenticationService login', function() {
    var user = {username: 'fred@email.com', password: 'aPassword'};
    scope.login(user);
    scope.$apply();

    expect(AuthenticationServiceMock.login.should.have.been.calledOnce).to.be.ok;
    expect(AuthenticationServiceMock.login.should.have.been.calledWith(user)).to.be.ok;
    expect(UserProfileServiceMock.getCurrentUser.should.have.been.calledOnce).to.be.ok;
    expect(stateMock.go.should.have.been.calledOnce).to.be.ok;
    expect(stateMock.go.should.have.been.calledWith('main')).to.be.ok;
  });

});
