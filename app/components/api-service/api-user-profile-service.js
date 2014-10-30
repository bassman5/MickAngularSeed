(function () {
  'use strict';

  angular.module('anApp')
    .factory('UserProfile', ['Api', 'CONST', function (Api, CONST) {
      return Api.withConfig(function(RestangularConfigurer) {
        RestangularConfigurer.extendModel('user-profile', function(model) {
          model.fullName = function() { return [this.firstName, this.lastName].join(' '); };
          return model;
        });
      }).all(CONST.API.USER_PROFILE);
    }]);

})();
