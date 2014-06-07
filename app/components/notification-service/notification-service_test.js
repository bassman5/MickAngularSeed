'use strict';

describe('Service: Notification', function () {

  var Notification, growl;
  beforeEach(function() {
    module('anApp');

    inject(function($injector) {
      Notification = $injector.get('Notification');
      growl        = $injector.get('growl');
    });
    spyOn(growl, 'addErrorMessage').and.stub();
    spyOn(growl, 'addSuccessMessage').and.stub();
    spyOn(growl, 'addWarnMessage').and.stub();

  });

  it('should do something', function () {
    expect(!!Notification).toBe(true);
  });

  it('should call error notification', function() {
    Notification.error('An Error Message');
    expect(growl.addErrorMessage.calls.count()).toEqual(1);
    expect(growl.addErrorMessage).toHaveBeenCalledWith('An Error Message', { ttl : -1 });
  });

  it('should call success notification', function() {
    var msg = 'A Success Message';
    Notification.success(msg);
    expect(growl.addSuccessMessage.calls.count()).toEqual(1);
    expect(growl.addSuccessMessage).toHaveBeenCalledWith(msg);
  });

  it('should call warn notification', function() {
    var msg = 'A Warn Message';
    Notification.warn(msg);
    expect(growl.addWarnMessage.calls.count()).toEqual(1);
    expect(growl.addWarnMessage).toHaveBeenCalledWith(msg);
  });

});
