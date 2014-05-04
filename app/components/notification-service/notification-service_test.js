'use strict';

/*global describe */
/*global it */
/*global beforeEach */
/*global inject */
/*global expect */

describe('Service: Notification', function () {

  var Notification, growlApi;
  beforeEach(function() {
    module('anApp');
    growlApi = {
      addErrorMessage: jasmine.createSpy('addErrorMessage'),
      addSuccessMessage: jasmine.createSpy('addSuccessMessage')
    };

    module(function ($provide) {
      $provide.value('growl', growlApi);
    });

    inject(function($injector) {
      Notification = $injector.get('Notification');
    });
  });

  it('should do something', function () {
    expect(!!Notification).toBe(true);
  });

  it('should call error notification', function() {
    Notification.error('An Error Message');
    expect(growlApi.addErrorMessage.calls.count()).toEqual(1);
    expect(growlApi.addErrorMessage).toHaveBeenCalledWith('An Error Message', { ttl : -1 });
  });

  it('should call success notification', function() {
    var msg = 'A Success Message';
    Notification.success(msg);
    expect(growlApi.addSuccessMessage.calls.count()).toEqual(1);
    expect(growlApi.addSuccessMessage).toHaveBeenCalledWith(msg);
  });

});
