'use strict';

angular.module('anApp')
  .controller('NavCtrl', ['$rootScope', '$scope', 'UserProfileService', function ($rootScope, $scope, UserProfileService) {
    $scope.isLoggedIn = UserProfileService.isLoggedIn;
    $scope.user       = UserProfileService.user;
  }]);
