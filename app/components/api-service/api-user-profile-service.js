'use strict';

angular.module('anApp')
  .factory('UserProfile', ['Api', function (ApiResource) {
    return ApiResource.withConfig(function(RestangularConfigurer) {
      RestangularConfigurer.extendModel('user-profile', function(model) {
        model.fullName = function() { return [this.firstName, this.lastName].join(' '); };
        return model;
      });
    }).all('user-profile');
  }]);
