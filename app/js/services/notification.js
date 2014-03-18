'use strict';

angular.module('dataDictApp')
  .config(['growlProvider', function(growlProvider) {
    growlProvider.globalTimeToLive(5000);
  }])

  .factory('Notification', ['growl', function (growl) {

    return {
      success: function (text) {
        growl.addSuccessMessage(text);
      },
      error: function (text) {
        growl.addErrorMessage(text, {ttl: -1});
      }
    };
  }]);
