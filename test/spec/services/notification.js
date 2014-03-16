'use strict';

/*global describe */
/*global it */
/*global beforeEach */
/*global inject */
/*global expect */
/* global sinon: false */
/* jshint -W030 */

describe('Service: Notification', function () {

  var Notification, growlApi;
  beforeEach(function() {
    module('dataDictApp');
    growlApi = { addErrorMessage: sinon.stub(),
      addSuccessMessage: sinon.stub()
    };

    module(function ($provide) {
      $provide.value('growl', growlApi);
    });

    inject(function($injector) {
      Notification = $injector.get('Notification');
    });
  });

  it('should do something', function () {
    expect(!!Notification).to.equal(true);
  });

  it('should call error notification', function() {
    Notification.error('An Error Message');
    expect(growlApi.addErrorMessage.should.have.been.calledOnce).to.be.ok;
    expect(growlApi.addErrorMessage.should.have.been.calledWith('An Error Message')).to.be.ok;
  });

  it('should call success notification', function() {
    var msg = 'A Success Message';
    Notification.success(msg);
    expect(growlApi.addSuccessMessage.should.have.been.calledOnce).to.be.ok;
    expect(growlApi.addSuccessMessage.should.have.been.calledWith(msg)).to.be.ok;
  });

});
