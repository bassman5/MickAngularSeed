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
//      RestangularConfigurer.setRequestSuffix('.json');
      RestangularConfigurer.setErrorInterceptor(
        function(resp) {
          Notification.error('Server error ' + (resp.data ? resp.data.message : '' || ''));
          return false; // stop the promise chain
        });
      RestangularConfigurer.setDefaultHttpFields({cache: false});

      RestangularConfigurer.setRequestInterceptor(function(elem, operation /*, what */) {
        if (operation === 'put' || operation === 'patch') {
          elem._id = undefined;
          return elem;
        }
        return elem;
      });
    });
  }]);
