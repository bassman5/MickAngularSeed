'use strict';

angular.module('anApp')
  .controller('SettingsCtrl', [ '$scope', 'UserProfileService', function ($scope, UserProfileService) {
    UserProfileService.getCurrentUser().then(function(user) {
      $scope.user = user;
    });
  }]);
