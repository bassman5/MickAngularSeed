// An example configuration file.
exports.config = {
  // Do not start a Selenium Standalone sever - only run this using chrome.
  chromeOnly: true,
  chromeDriver: '../node_modules/protractor/selenium/chromedriver',

//  The second method for running Protractor tests is to connect to a separately running Selenium server.
//  When our tests start to grow more complex, we’ll likely want to run our tests using a separate Selenium server.
//
//  To configure Protractor to use this separate server, we need to delete the previous two options
//  (chromeOnly and chromeDriver) and add the seleniumAddress option that points to the running Selenium server.
//
//  seleniumAddress: 'http://0.0.0.0:4444/wd/hub',


  // Capabilities to be passed to the webdriver instance.
  capabilities: {
    'browserName': 'chrome'
  },

  // Spec patterns are relative to the current working directly when
  // protractor is called.
  specs: ['e2e/spec/**/*.js'],

  // The server under test
  baseUrl: 'http://localhost:9000/',

  framework:'mocha',

  mochaOpts: {
    ui: "bdd",
    reporter: "spec",
    require: 'chai',
    slow: 3000
  }
  // Options to be passed to Jasmine-node.
//  jasmineNodeOpts: {
//    showColors: true,
//    defaultTimeoutInterval: 30000
//  }
};
