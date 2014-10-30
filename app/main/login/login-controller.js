(function () {
  'use strict';

  angular.module('anApp')
    .controller('LoginCtrl', ['$scope', 'AuthenticationService', '$state', 'UserProfileService', function ($scope, AuthenticationService, $state, UserProfileService) {
      $scope.login = function (credentials) {
        $scope.error = '';
        AuthenticationService.login(credentials).then(function () {
          UserProfileService.getCurrentUser().then(function () {
            $state.go('main');
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

})();
