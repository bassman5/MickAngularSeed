'use strict';

angular.module('anApp')
  .factory('Users', ['Api', function (ApiResource) {
    return ApiResource.withConfig(function(RestangularConfigurer) {
      RestangularConfigurer.extendModel('users', function(model) {
        model.fullName = function() { return [this.firstName, this.lastName].join(' '); };
        return model;
      });
    }).all('users');
  }]);
