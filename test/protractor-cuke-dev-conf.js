// An example configuration file.
exports.config = {
  // Do not start a Selenium Standalone sever - only run this using chrome.
  chromeOnly: true,
  chromeDriver: '../node_modules/protractor/selenium/chromedriver',


  capabilities: {
    browserName: 'chrome'
  },



  // The server under test
  baseUrl: 'http://localhost:' + (process.env.HTTP_PORT || '9000'),

  framework:'cucumber',

  specs: ['cuke/features/*.feature'],
  cucumberOpts: {
//    tags: '@dev',
    format: 'pretty'
  }

};
