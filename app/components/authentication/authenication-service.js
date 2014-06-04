'use strict';
// This service provides login and logout services
// The config service has the URLs and token names to use
// from https://medium.com/opinionated-angularjs/techniques-for-authentication-in-angularjs-applications-7bbf0346acec
angular.module('anApp')
  .service('AuthenticationService', ['$http', 'authService', '$rootScope', 'AUTH', '$q', function AuthenticationService($http, authService, $rootScope, AUTH, $q) {
    var authenticated = false;

    function login(user) {
      var deferred = $q.defer();
      $http.post(AUTH.URL.LOGIN, {user: user}, { ignoreAuthModule: true })
        .success(function (data, status, headers, config) {

          $http.defaults.headers.common[AUTH.TOKEN.HEADER_NAME] = data[AUTH.TOKEN.DATA_NAME];  // Step 1
          authenticated = true;

          // Need to inform the http-auth-interceptor that
          // the user has logged in successfully.  To do this, we pass in a function that
          // will configure the request headers with the authorization token so
          // previously failed requests(aka with status == 401) will be resent with the
          // authorization token placed in the header
          // or set the config.headers we want passed, e.g. config.headers.Authorization
//          authService.loginConfirmed(data, function(config) {  // Step 2 & 3
//            config.headers.Authorization = data.authorizationToken;
//            return config;
//          });
          config.headers[AUTH.TOKEN.HEADER_NAME] = data[AUTH.TOKEN.DATA_NAME];
          authService.loginConfirmed(config);
          deferred.resolve();
        })
        .error(function (data, status /*, headers, config */) {
          $rootScope.$broadcast(AUTH.EVENTS.loginFailed, status, data);
          deferred.reject();
        });
      return deferred.promise;
    }

    function logout() {
      var deferred = $q.defer();
      $http.post(AUTH.URL.LOGOUT, {}, { ignoreAuthModule: true })
        // This is ie8 funky syntax for finally
        ['finally'](function() {
          delete $http.defaults.headers.common[AUTH.TOKEN.HEADER_NAME];
          authenticated = false;
          $rootScope.$broadcast(AUTH.EVENTS.logoutSuccess);
          deferred.resolve();
        });
      return deferred.promise;
    }


    function loginCancelled() {
      authService.loginCancelled();
      authenticated = false;
    }

    function isAuthenticated() {
      return authenticated;
    }


    return {
      login:           login,
      logout:          logout,
      loginCancelled:  loginCancelled,
      isAuthenticated: isAuthenticated
    };
  }]);
