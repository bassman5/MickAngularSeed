'use strict';

// From example https://medium.com/opinionated-angularjs/7bbf0346acec

angular.module('anApp')
  .controller('LoginCtrl', ['$scope', '$log', 'AuthenticationService', '$state', 'UserProfileService', function ($scope, $log, AuthenticationService, $state, UserProfileService) {
    $scope.login = function (credentials) {
      $scope.error = '';
      AuthenticationService.login(credentials).then(function () {
        UserProfileService.getCurrentUser().then(function () {
          $state.go('dashboard');
        });
      }, function (data) {
        $scope.error = data && data.message || 'Invalid login';
      });
    };

    $scope.error = '';
    $scope.credentials = {
      username: '',
      password: ''
    };
  }]);
