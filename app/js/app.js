'use strict';

angular.module('dataDictApp', [
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
        templateUrl: 'views/main.html',
        controller: 'MainCtrl'
      })
      .state('about', {
        url: '/about',
        templateUrl: 'views/about.html',
        controller: 'AboutCtrl'
      })
      .state('contact', {
        url: '/contact',
        templateUrl: 'views/contact.html',
        controller: 'ContactCtrl'
      })
      // For any unmatched url, redirect to /state1
      .state('settings', {
        url: '/settings',
        templateUrl: 'views/settings.html',
        controller: 'SettingsCtrl'
      });
  });

