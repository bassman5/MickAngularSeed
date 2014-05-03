'use strict';

/*global describe */
/*global it */
/*global beforeEach */
/*global inject */
/*global expect */
/*global sinon */

describe('Controller: LogoutCtrl', function () {
  // load the controller's module

  var AuthenticationServiceMock,
    UserProfileServiceMock,
    LogoutCtrl,
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

      AuthenticationServiceMock = {logout: function() {}};
      sinon.stub(AuthenticationServiceMock, 'logout').returns(promised());

      UserProfileServiceMock = {logout: function() {}};
      sinon.stub(UserProfileServiceMock, 'logout').returns(promised());

      stateMock = {go: function() {}};
      sinon.stub(stateMock, 'go');

      scope         = $rootScope.$new();

      LogoutCtrl = $controller('LogoutCtrl', {
        $scope:                scope,
        AuthenticationService: AuthenticationServiceMock,
        UserProfileService:    UserProfileServiceMock,
        $state:                stateMock
      });
    });


  });

  it('should call AuthenticationService logout', function() {
    // Don't need to call logout, constructing controller calls logout()
    scope.$apply();

    expect(AuthenticationServiceMock.logout.should.have.been.calledOnce, 'AuthenticationServiceMock.logout').to.be.ok;
    expect(UserProfileServiceMock.logout.should.have.been.calledOnce, 'UserProfileServiceMock.logout').to.be.ok;
    expect(stateMock.go.should.have.been.calledOnce).to.be.ok;
    expect(stateMock.go.should.have.been.calledWith('main')).to.be.ok;
  });

});
