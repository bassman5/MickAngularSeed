'use strict';

angular.module('anApp')
  .controller('LoginCtrl', ['$scope', '$log', 'AuthenticationService', '$state', 'UserProfileService', function ($scope, $log, AuthenticationService, $state, UserProfileService) {
    $scope.login = function (credentials) {
      AuthenticationService.login(credentials).then(function () {
        UserProfileService.getCurrentUser().then(function () {
          $state.go('main');
        });
      });
    };
    $scope.credentials = {
      username: '',
      password: ''
    };
  }]);
