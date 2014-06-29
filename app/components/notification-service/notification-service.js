'use strict';

angular.module('anApp')
  .config(['growlProvider', 'CONST', function(growlProvider, CONST) {
    growlProvider.globalTimeToLive(CONST.NOTIFICATION.TTL);
  }])

  .factory('Notification', ['growl', function (growl) {

    return {
      success: function (text) {
        growl.addSuccessMessage(text);
      },
      warn: function (text) {
        growl.addWarnMessage(text);
      },
      error: function (text) {
        growl.addErrorMessage(text, {ttl: -1});
      }
    };
  }]);
