'use strict';

angular.module('anApp')
  .controller('LogoutCtrl', ['$scope', '$log', 'AuthenticationService', '$state', 'UserProfileService', function ($scope, $log, AuthenticationService, $state, UserProfileService) {
    $scope.logout = function () {
      AuthenticationService.logout().then(function () {
        UserProfileService.logout().then(function () {
          $state.go('main');
        });
      });
    };
    $scope.logout();

  }]);
