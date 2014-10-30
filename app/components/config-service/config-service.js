(function () {
  'use strict';

  angular.module('anApp')
    .constant('CONST', {
      API: {
        BASE_URL: '/api/v1',
        USER_PROFILE: 'user-profile',
        LOGIN: 'login',
        LOGOUT: 'logout',
        REGISTER: 'register'
      },
      AUTH: {
        URL: {
          LOGIN: '/login',
          LOGOUT: '/logout',
          REGISTER: '/register',
          USER_PROFILE: '/user-profile'
        },
        // Events for authentication
        EVENTS: {
          loginSuccess: 'event:auth-loginConfirmed',
          loginFailed: 'event:auth-login-failed',
          logoutSuccess: 'event:auth-logout-complete',
          sessionTimeout: 'auth-session-timeout',
          notAuthenticated: 'event:auth-loginRequired',
          notAuthorized: 'auth-not-authorized',
          userProfileLoaded: 'event:user-profile-loaded'
        },
        // Token names
        TOKEN: {
          DATA_NAME: 'authorizationToken', // The field in the data response from the server that contains our auth token
          HEADER_NAME: 'Authorization'   // The name of the header we must always pass for authenticated pages
        },
        ROLES: {
          ALL: '*',
          ADMIN: 'admin',
          USER: 'user',
          GUEST: 'guest'
        }
      },
      NOTIFICATION: {
        TTL: 5000
      }
    });

})();


