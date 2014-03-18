'use strict';

angular.module('anApp')
  .service('Config', function Config() {
    // AngularJS will instantiate a singleton by calling "new" on this function
    return {
      APP_VERSION: 0.1,
      API_BASE_URL: '/api/v1/',

      AUTH_URL: '/-/auth',
      AUTH_ERROR_REDIRECT_URL: '/login',
      AUTH_LOGIN_REDIRECT_URL: '/login',
      AUTH_LOGOUT_REDIRECT: '/',
      AUTH_REGISTER_REDIRECT_URL: '/register',
      AUTH_SUCCESS_REDIRECT_URL: '/',

      // possible values: 'disable' || 'assert' || 'error' || 'warn' || 'info' || 'debug'
      LOG_LEVEL: 'debug',

      GROWL_TTL: 2000,
      ROW_HEIGHT: 30,
      HEADER_HEIGHT: 34
    };
  });
