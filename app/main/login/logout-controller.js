'use strict';

angular.module('anApp')
  .controller('LogoutCtrl', ['$scope', 'AuthenticationService', '$state', 'UserProfileService', 'Notification', function ($scope, AuthenticationService, $state, UserProfileService, Notification) {
    $scope.logout = function () {
      AuthenticationService.logout().then(function () {
        UserProfileService.logout().then(function () {
          $state.go('main');
          Notification.success('You are now logged out');
        });
      });
    };
    $scope.logout();

  }]);
