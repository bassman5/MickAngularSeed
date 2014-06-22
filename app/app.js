'use strict';

angular.module('anApp', [
    'ui.router',
    'ui.bootstrap',
    'ngCookies',
    'ngResource',
    'ngSanitize',
    'ngAnimate',
    'restangular',
    'angular-growl',
    'http-auth-interceptor',
    'angulartics',
    'angulartics.google.analytics'

  ])
  .config(['$stateProvider', '$urlRouterProvider', '$locationProvider', function ($stateProvider, $urlRouterProvider, $locationProvider) {

    $locationProvider.html5Mode(false);

    //
    $urlRouterProvider.otherwise('/');
    //
    // Now set up the states
    $stateProvider
      .state('main', {
        url: '/',
        templateUrl: 'main/main.html',
        controller: 'MainCtrl'
      })
      .state('about', {
        url: '/about',
        templateUrl: 'about/about.html',
        controller: 'AboutCtrl'
      })
      .state('login', {
        url: '/login',
        templateUrl: 'main/login/login.html',
        controller: 'LoginCtrl'
      })
      .state('logout', {
        url: '/logout',
        templateUrl: 'main/login/logout.html',
        controller: 'LogoutCtrl'
      })
      .state('contact', {
        url: '/contact',
        templateUrl: 'contact/contact.html',
        controller: 'ContactCtrl'
      })
      .state('settings', {
        url: '/settings',
        templateUrl: 'settings/settings.html',
        controller: 'SettingsCtrl'
      });
  }])
  .run(function() {
    /* global FastClick: false */
    FastClick.attach(document.body);
  });

