'use strict';

angular.module('anApp', [
    'ui.router',
    'ngCookies',
    'ngResource',
    'ngSanitize',
    'restangular',
    'angular-growl'
  ])
  .config(function ($stateProvider, $urlRouterProvider) {
    //
    $urlRouterProvider.otherwise('/');
    //
    // Now set up the states
    $stateProvider
      .state('main', {
        url: '/',
        templateUrl: 'modules/main/main.html',
        controller: 'MainCtrl'
      })
      .state('about', {
        url: '/about',
        templateUrl: 'modules/about/about.html',
        controller: 'AboutCtrl'
      })
      .state('contact', {
        url: '/contact',
        templateUrl: 'modules/contact/contact.html',
        controller: 'ContactCtrl'
      })
      // For any unmatched url, redirect to /state1
      .state('settings', {
        url: '/settings',
        templateUrl: 'modules/settings/settings.html',
        controller: 'SettingsCtrl'
      });
  });

