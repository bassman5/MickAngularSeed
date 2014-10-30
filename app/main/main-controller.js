(function () {
  'use strict';

  angular.module('anApp')
    .controller('MainCtrl', ['$scope', 'UserProfileService', function ($scope, UserProfileService) {
      $scope.awesomeThings = [
        'HTML5 Boilerplate',
        'AngularJS',
        'Karma'
      ];

      $scope.isLoggedIn = UserProfileService.isLoggedIn();
      $scope.user = UserProfileService.user();
    }]);

})();
