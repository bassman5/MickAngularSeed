'use strict';

/*global describe */
/*global it */
/*global beforeEach */
/*global inject */
/*global expect */
/*global sinon */

describe('Controller: SettingsCtrl', function () {

  // load the controller's module
  beforeEach(module('anApp'));

  var SettingsCtrl,
    scope,
    UserProfileServiceMock;

  beforeEach(function() {
    module('anApp');

    inject(function($injector, $controller, $rootScope, $q) {
      var promised = function () {
        var q = $q.defer();
        q.resolve();
        return q.promise;
      };

      UserProfileServiceMock = {getCurrentUser: function() {}};
      sinon.stub(UserProfileServiceMock, 'getCurrentUser').returns(promised());

      scope         = $rootScope.$new();

      SettingsCtrl = $controller('SettingsCtrl', {
        $scope:                scope,
        UserProfileService:    UserProfileServiceMock
      });
    });


  });

  it('should load user profile data', function () {
    scope.$apply();
    expect(UserProfileServiceMock.getCurrentUser.should.have.been.calledOnce).to.be.ok;
  });
});
