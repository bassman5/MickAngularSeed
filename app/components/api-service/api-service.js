(function () {
  'use strict';

  angular.module('anApp')
    .factory('Api', ['CONST', 'Restangular', 'Notification', function (CONST, Restangular, Notification) {
      return Restangular.withConfig(function (RestangularConfigurer) {
        RestangularConfigurer.setBaseUrl(CONST.API.BASE_URL);
        RestangularConfigurer.setRestangularFields({
          id: '_id',
          route: 'restangularRoute',
          selfLink: 'self.href'
        });
//      RestangularConfigurer.setRequestSuffix('.json');
        RestangularConfigurer.setErrorInterceptor(
          function (resp) {
            Notification.error((resp.data ? resp.data.message : 'Server error') || 'Server error');
            return false; // stop the promise chain
          });
        RestangularConfigurer.setDefaultHttpFields({cache: false});

        RestangularConfigurer.setRequestInterceptor(function (elem, operation /*, what */) {
          if (operation === 'put' || operation === 'patch') {
            elem._id = undefined;
            return elem;
          }
          return elem;
        });
      });
    }]);

})();
