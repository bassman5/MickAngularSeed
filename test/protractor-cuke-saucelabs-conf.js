'use strict';

exports.config = {
  // Do not start a Selenium Standalone sever - only run this using chrome.
  chromeOnly: false,

  // Capabilities to be passed to the webdriver instance.
//  seleniumAddress: 'http://127.0.0.1:4444/wd/hub',

  multiCapabilities: [
    {
      name: 'MAS - Client',
      tags: ['e2e'],
      build:               '"' + process.env.TRAVIS_JOB_NUMBER + '"',
      'tunnel-identifier': '' + process.env.TRAVIS_JOB_NUMBER,
      platform: 'Windows 8',
      'browserName': 'firefox'
    },
    {
      name: 'MAS - Client',
      tags: ['e2e'],
      build:               '"' + process.env.TRAVIS_JOB_NUMBER + '"',
      'tunnel-identifier': '' + process.env.TRAVIS_JOB_NUMBER,
      platform: 'OS X 10.9',
      'browserName': 'safari'
    }
//    ,
//    {
//      name: 'MAS - Client',
//      tags: ['e2e'],
//      build:               '"' + process.env.TRAVIS_JOB_NUMBER + '"',
//      'tunnel-identifier': '' + process.env.TRAVIS_JOB_NUMBER,
//      platform: 'OS X 10.9',
//      'browserName': 'chrome'
//    }
  ],


  // The server under test
  baseUrl: 'http://0.0.0.0:' + (process.env.HTTP_PORT || '9000'),
  onPrepare: function() {
    // Set the browser size with this
//    browser.driver.manage().window().setSize(1200, 800);
    // Disable Animations with this
    var disableNgAnimate = function() {
      angular.module('disableNgAnimate', []).run(function($animate) {
        $animate.enabled(false);
      });
    };
    browser.addMockModule('disableNgAnimate', disableNgAnimate);

    // This will make the default time for a growl message 10ms
    var disableGrowlTTL= function() {
      angular.module('disableGrowlTTL', []).config(function(growlProvider) {
        growlProvider.globalTimeToLive(10);
      });
    };

    browser.addMockModule('disableGrowlTTL', disableGrowlTTL);
  },
  framework:'cucumber',

  specs: ['cuke/features/*.feature'],
  cucumberOpts: {
//    tags: '@dev',
    format: 'pretty'
  }

};
