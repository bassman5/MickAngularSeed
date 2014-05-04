'use strict';

/*global describe */
/*global it */
/*global beforeEach */
/*global inject */
/*global expect */

describe('Controller: SettingsCtrl', function () {

  // load the controller's module
  beforeEach(module('anApp'));

  var SettingsCtrl,
    scope,
    UserProfileService;

  beforeEach(function() {
    module('anApp');

    inject(function($injector, $controller, $rootScope, $q) {
      var promised = function () {
        var q = $q.defer();
        q.resolve();
        return q.promise;
      };

      UserProfileService    = $injector.get('UserProfileService');
      spyOn(UserProfileService, 'getCurrentUser').and.callFake(promised);

      scope         = $rootScope.$new();

      SettingsCtrl = $controller('SettingsCtrl', {
        $scope:                scope
      });
    });


  });

  it('should load user profile data', function () {
    scope.$apply();
    expect(UserProfileService.getCurrentUser.calls.count()).toEqual(1);
  });
});
