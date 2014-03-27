// Karma configuration
// http://karma-runner.github.io/0.10/config/configuration-file.html

module.exports = function(config) {
  config.set({
    // base path, that will be used to resolve files and exclude
    basePath: '../',

    // testing framework to use (jasmine/mocha/qunit/...)
    frameworks: ['mocha', 'sinon-chai'],

    // list of files / patterns to load in the browser
    files: [
      '../bower_components/angular/angular.js',
      '../bower_components/lodash/dist/lodash.compat.js',
      '../bower_components/angular-mocks/angular-mocks.js',
      '../bower_components/angular-resource/angular-resource.js',
      '../bower_components/angular-cookies/angular-cookies.js',
      '../bower_components/angular-sanitize/angular-sanitize.js',
      '../bower_components/angular-ui-router/release/angular-ui-router.js',
      '../bower_components/restangular/src/restangular.js',
      '../bower_components/angular-growl/build/angular-growl.js',

      'app/*.js',
      'app/modules/**/*.js',
//      'modules/about/**/*.js',
//      'modules/contact/**/*.js',
//      'modules/settings/**/*.js',
      'app/components/**/*.js',
//      'test/mock/**/*.js',
      'test/spec/**/*_test.js'
    ],

    // list of files / patterns to exclude
    exclude: [],

    // web server port
    port: 8181,

    // level of logging
    // possible values: LOG_DISABLE || LOG_ERROR || LOG_WARN || LOG_INFO || LOG_DEBUG
    logLevel: config.LOG_INFO,

    // enable / disable watching file and executing tests whenever any file changes
    autoWatch: false,


    // Start these browsers, currently available:
    // - Chrome
    // - ChromeCanary
    // - Firefox
    // - Opera
    // - Safari (only Mac)
    // - PhantomJS
    // - IE (only Windows)
    browsers: ['Chrome'],

    preprocessors: {
      'app/scripts/**/*.js': 'coverage'
    },
    // test results reporter to use
    // possible values: 'dots', 'progress', 'junit', 'growl', 'coverage'
    reporters: ['progress', 'growl', 'coverage'],


    // Continuous Integration mode
    // if true, it capture browsers, run tests and exit
    singleRun: false
  });
};
