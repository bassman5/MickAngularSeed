'use strict';

angular.module('anApp')
  .factory('Api', ['Config', 'Restangular', 'Notification', function (Config, Restangular, Notification) {
    return Restangular.withConfig(function (RestangularConfigurer) {
      RestangularConfigurer.setBaseUrl(Config.API_BASE_URL);
      RestangularConfigurer.setRestangularFields({
        id: '_id',
        route: 'restangularRoute',
        selfLink: 'self.href'
      });
      RestangularConfigurer.setRequestSuffix('.json');
      RestangularConfigurer.setErrorInterceptor(
        function(resp) {
          Notification.error('Server error ' + (resp.data ? resp.data.message : '' || ''));
          return false; // stop the promise chain
        });
      RestangularConfigurer.setDefaultHttpFields({cache: false});

      RestangularConfigurer.setRequestInterceptor(function(elem, operation /*, what */) {
        if (operation === 'put') {
          elem._id = undefined;
          return elem;
        }
        return elem;
      });
    });
  }])


  .factory('Users', ['Api', function (ApiResource) {
    return ApiResource.withConfig(function(RestangularConfigurer) {
      RestangularConfigurer.extendModel('users', function(model) {
        model.say = function(msg) { return msg; };
        return model;
      });
    }).all('users');
  }]);
