'use strict';

angular.module('anApp')
  .service('UserProfileService', ['$rootScope', '$http', 'Config', 'UserProfile', '_', '$q', 'AUTH', function UserProfileService($rootScope, $http, Config, UserProfile, _, $q, AUTH) {
    var _user = {};


    function user() {
      return _user;
    }

    function getCurrentUser() {
      var deferred = $q.defer();
      UserProfile.get('').then (function (user) {
        _user = user;
        $rootScope.$broadcast(AUTH.EVENTS.userProfileLoaded);
        deferred.resolve(_user);
      });
      return deferred.promise;
    }

    function logout() {
      var deferred = $q.defer();
      _user = {};
      deferred.resolve();
      return deferred.promise;
    }

    function isLoggedIn() {
      return !_.isEmpty(_user);
    }


    return {
      user:       user,
      getCurrentUser:         getCurrentUser,
      isLoggedIn: isLoggedIn,
      logout:     logout
    };
  }]);
