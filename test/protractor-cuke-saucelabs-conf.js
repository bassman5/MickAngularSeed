// An example configuration file.
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
      platform: 'Windows 7',
      'browserName': 'firefox'
    },
//    {
//    platform: 'Windows 7',
//      'browserName': 'iexplore',
//      version: 10
//    },
    {
      name: 'MAS - Client',
      tags: ['e2e'],
      build:               '"' + process.env.TRAVIS_JOB_NUMBER + '"',
      'tunnel-identifier': '' + process.env.TRAVIS_JOB_NUMBER,
      platform: 'OS X 10.9',
      'browserName': 'safari'
    },
//    {
//      name: 'MAS - Client',
//      tags: ['e2e'],
//      build:               '"' + process.env.TRAVIS_JOB_NUMBER + '"',
//      'tunnel-identifier': '' + process.env.TRAVIS_JOB_NUMBER,
//      platform: 'OS X 10.9',
//      'browserName': 'chrome'
//    },
    {
      name: 'MAS - Client',
      tags: ['e2e'],
      build:               '"' + process.env.TRAVIS_JOB_NUMBER + '"',
      'tunnel-identifier': '' + process.env.TRAVIS_JOB_NUMBER,
      platform: 'Windows 7',
      'browserName': 'iexplore',
      version: 9
    }
  ],


  // The server under test
  baseUrl: 'http://0.0.0.0:' + (process.env.HTTP_PORT || '9000'),

  framework:'cucumber',

  specs: ['cuke/features/*.feature'],
  cucumberOpts: {
//    tags: '@dev',
    format: 'pretty'
  }

};
