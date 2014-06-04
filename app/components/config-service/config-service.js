'use strict';

angular.module('anApp')
  .service('Config', function Config() {
    // AngularJS will instantiate a singleton by calling "new" on this function
    return {
      APP_VERSION: 0.1,
      API_BASE_URL: '/api/v1/',


      // possible values: 'disable' || 'assert' || 'error' || 'warn' || 'info' || 'debug'
      LOG_LEVEL: 'debug',

      GROWL_TTL: 2000,
      ROW_HEIGHT: 30,
      HEADER_HEIGHT: 34
    };
  })

  .constant('AUTH', {
    URL: {
      LOGIN: '/login',
      LOGOUT: '/logout',
      REGISTER: '/register',
      USER_PROFILE: '/api/v1/user-profile'
    },
    // Events for authentication
    EVENTS: {
      loginSuccess:     'event:auth-loginConfirmed',
      loginFailed:      'event:auth-login-failed',
      logoutSuccess:    'event:auth-logout-complete',
      sessionTimeout:   'auth-session-timeout',
      notAuthenticated: 'event:auth-loginRequired',
      notAuthorized:    'auth-not-authorized',
      userProfileLoaded: 'event:user-profile-loaded'
    },
    // Token names
    TOKEN: {
      DATA_NAME:   'authorizationToken', // The field in the data response from the server that contains our auth token
      HEADER_NAME: 'Authorization'   // The name of the header we must always pass for authenticated pages
    },
    ROLES: {
      ALL:   '*',
      ADMIN: 'admin',
      USER:  'user',
      GUEST: 'guest'
    }
  });
