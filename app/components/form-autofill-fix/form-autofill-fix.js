(function () {
  'use strict';

  angular.module('anApp')
    .directive('formAutofillFix', function ($timeout) {
      return function (scope, element, attrs) {
        element.prop('method', 'post');
        if (attrs.ngSubmit) {
          $timeout(function () {
            element.unbind('submit').bind('submit', function (event) {
              event.preventDefault();

              element.find('input, textarea, select')
                .trigger('input').trigger('change').trigger('keydown');

              scope.$apply(attrs.ngSubmit);
            });
          });
        }
      };
    });

})();
