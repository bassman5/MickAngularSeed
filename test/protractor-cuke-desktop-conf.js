// An example configuration file.
exports.config = {
  // Do not start a Selenium Standalone sever - only run this using chrome.
  chromeOnly: false,

  // Capabilities to be passed to the webdriver instance.
  seleniumAddress: 'http://127.0.0.1:4444/wd/hub',

  multiCapabilities: [
    {
//      platform: 'OS X 10.9',
      'browserName': 'firefox'
    },
    {
//      platform: 'OS X 10.9',
      'browserName': 'safari'
    },
    {
//      platform: 'OS X 10.9',
      'browserName': 'chrome'
    }
  ],


  // The server under test
  baseUrl: 'http://localhost:' + (process.env.HTTP_PORT || '9000'),

  framework:'cucumber',

  specs: ['cuke/features/*.feature'],
  cucumberOpts: {
//    tags: '@dev',
    format: 'pretty'
  }

};
