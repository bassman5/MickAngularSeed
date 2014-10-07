// Generated on 2014-02-16 using generator-angular 0.7.1
'use strict';

/*jshint camelcase: false */


// # Globbing
// for performance reasons we're only matching one level down:
// 'test/spec/{,*/}*.js'
// use this if you want to recursively match all subfolders:
// 'test/spec/**/*.js'

module.exports = function (grunt) {

  // Load grunt tasks automatically
  require('load-grunt-tasks')(grunt);

  // Time how long tasks take. Can help when optimizing build times
  require('time-grunt')(grunt);
  var modRewrite = require('connect-modrewrite');

  var Config = {
    project: 'MAS',
    bucket: 'mickangularseed',
//    region: 'us-west-1',
    region: 'us-east-1',
    dev: {
      port: 9000
    },
    test: {
      port: 9001
    },
    e2e: {
      port: 9002
    },
    prod: {}
  };


  // Define the configuration for all the tasks
  grunt.initConfig({

    credentials: function() {
      if (grunt.file.exists('.credentials.json')) {
        return grunt.file.readJSON('.credentials.json');  // Read the file
      }
      return {  // Use values if there is no file called .credentials.json
        AwsAccessKeyId: 'not set', AwsSecretAccessKey: 'not set',
        GoogleAnalyticsKey: 'XXXXXXXXX', GoogleAnalyticsHost: 'aaa.host.com'};
    },


    // Project settings
    yeoman: {
      // configurable paths
      app:     require('./bower.json').appPath || 'app',
      tmp:     '.tmp',
      distTmp: '.tmp/dist',
      dist:    'dist'
    },

    // Watches files for changes and runs tasks based on the changed files
    watch: {
      bower: {
        files: ['bower.json'],
        tasks: ['wiredep']
      },
      js: {
        files: ['<%= yeoman.app %>/**/*.js'],
        tasks: ['newer:jshint:all'],
        options: {
          livereload: true
        }
      },
      karma: {
        files: ['<%= yeoman.app %>/**/*.js'],
        tasks: ['karma:watch:run'] //NOTE the :run flag
      },
      jsTest: {
        files: ['<%= yeoman.app %>/**/*_test.js', 'test/**/*.js', '!test/server/node_modules/**/*.js'],
        tasks: ['newer:jshint:test']
      },
      compass: {
        files: ['<%= yeoman.app %>/**/*.{scss,sass}'],
        tasks: ['compass:server', 'autoprefixer']
      },
      express: {
        files:  [ 'test/server/**/*.js', '!test/server/node_modules/**/*.js' ],
        tasks:  [ 'express:dev' ],
        options: {
          spawn: false // for grunt-contrib-watch v0.5.0+, "nospawn: true" for lower versions. Without this option specified express won't be reloaded
        }
      },
      gruntfile: {
        files: ['Gruntfile.js']
      },
      livereload: {
        options: {
          livereload: '<%= connect.options.livereload %>'
        },
        files: [
          '<%= yeoman.app %>/**/*.html',
          '.tmp/styles/{,*/}*.css',
          '<%= yeoman.app %>/images/{,*/}*.{png,jpg,jpeg,gif,webp,svg}'
        ]
      }
    },

    // The actual grunt server settings
    connect: {
      options: {
        port: Config.dev.port,
        // Change this to '0.0.0.0' to access the server from outside, localhost to only view from this machine.
        hostname: '0.0.0.0',
        livereload: 35729
      },
      livereload: {
        options: {
          open: true,
          base: [
            '.tmp',
            '<%= yeoman.app %>',
            '.'
          ],
          // MODIFIED: Add this middleware configuration
          middleware: function(connect, options) {
            var middlewares = [];

            middlewares.push(modRewrite(['^[^\\.]*$ /index.html [L]'])); //Matches everything that does not contain a '.' (period)
            options.base.forEach(function(base) {
              middlewares.push(connect.static(base));
            });
            return middlewares;
          }
        }
      },
      test: {
        options: {
          port: Config.test.port,
          base: [
            '.tmp',
            'test',
            '<%= yeoman.app %>'
          ]
        }
      },
      e2e: {
        options: {
          keepalive: true,
          port: Config.e2e.port,
//          base: '<%= yeoman.dist %>'
          base: [
            '.tmp',
            '<%= yeoman.app %>',
            '.'
          ]
        }

      },
      dist: {
        options: {
          keepalive: true,
          port: Config.e2e.port
//          base: '<%= yeoman.dist %>'
        }
      }
    },

    express: {
      options: {
        // Override defaults here
      },
      dev: {
        options: {
          port: Config.dev.port,
          script: 'test/server/bin/www'
        }
      },
      production: {
        options: {
          port: Config.e2e.port,
          node_env: 'production',
          script: 'test/server/bin/www'
        }
      },
      test: {
        options: {
          port: Config.test.port,
          node_env: 'test',
          script: 'test/server/bin/www'
        }
      },
      e2e: {
        options: {
          port: Config.e2e.port,
          node_env: 'e2e',
          script: 'test/server/bin/www'
        }
      }
    },

    // Make sure code styles are up to par and there are no obvious mistakes
    jshint: {
      options: {
        jshintrc: '.jshintrc',
        reporter: require('jshint-stylish')
      },
      all: [
        'Gruntfile.js',
        '<%= yeoman.app %>/**/*.js',
        '!<%= yeoman.app %>/**/*_test.js'
      ],
      test: {
        options: {
          jshintrc: 'test/.jshintrc'
        },
        src: ['test/e2e/**/*.js', 'test/cuke/**/*.js', '<%= yeoman.app %>/**/*_test.js']
      }
    },

    // Empties folders to start fresh
    clean: {
      dist: {
        files: [{
          dot: true,
          src: [
            '<%= yeoman.tmp %>',
            '<%= yeoman.dist %>/*',
            '<%= yeoman.distTmp %>/*',
            '!<%= yeoman.distTmp %>/.git*'
          ]
        }]
      },
      server: '<%= yeoman.tmp %>'
    },

    // Add vendor prefixed styles
    autoprefixer: {
      options: {
        browsers: ['last 1 version']
      },
      dist: {
        files: [{
          expand: true,
          cwd: '<%= yeoman.tmp %>/styles/',
          src: '{,*/}*.css',
          dest: '<%= yeoman.tmp %>/styles/'
        }]
      }
    },

    // Automatically inject Bower components into the app
    wiredep: {
      app: {
        src: ['<%= yeoman.app %>/index.html'],
        ignorePath: '<%= yeoman.app %>/'
        // Optional:
        // ---------
//        cwd: '',
//        dependencies: true,
//        devDependencies: false,
//        exclude: [],
//        fileTypes: {},
//        ignorePath: '',
//        overrides: {}

      },
      sass: {
        src: ['<%= yeoman.app %>/styles/app.scss'],
        ignorePath: '<%= yeoman.app %>/bower_components/'
      }
    },


    // Compiles Sass to CSS and generates necessary files if requested
    compass: {
      options: {
        sassDir: '<%= yeoman.app %>/styles',
        cssDir: '.tmp/styles',
        generatedImagesDir: '.tmp/images/generated',
        imagesDir: '<%= yeoman.app %>/images',
        javascriptsDir: '<%= yeoman.app %>/scripts',
        fontsDir: '<%= yeoman.app %>/styles/fonts',
        importPath: '<%= yeoman.app %>/../bower_components',
        httpImagesPath: '/images',
        httpGeneratedImagesPath: '/images/generated',
        httpFontsPath: '/styles/fonts',
        relativeAssets: false,
        assetCacheBuster: false,
        raw: 'Sass::Script::Number.precision = 10\n'
      },
      dist: {
        options: {
          generatedImagesDir: '<%= yeoman.dist %>/images/generated'
        }
      },
      ie8: {
        options: {
          debugInfo: false
        }
      },
      server: {
        options: {
          debugInfo: true
        }
      }
    },

    filerev: {
      options: {
        encoding: 'utf8',
        algorithm: 'md5',
        length: 8
      },
      dist: {
        src: [
          '<%= yeoman.distTmp %>/js/{,*/}*.js',
          '<%= yeoman.distTmp %>/styles/{,*/}*.css',
          '<%= yeoman.distTmp %>/images/{,*/}*.{png,jpg,jpeg,gif,webp,svg}',
          '<%= yeoman.distTmp %>/styles/fonts/*'
        ]
      }
    },


    // Reads HTML for usemin blocks to enable smart builds that automatically
    // concat, minify and revision files. Creates configurations in memory so
    // additional tasks can operate on them
    useminPrepare: {
      html: '<%= yeoman.app %>/index.html',
      options: {
        root: '<%= yeoman.app %>',
        dest: '<%= yeoman.distTmp %>'
      }

    },

    replace: {
      // Only add Analytics tracking when doing production build
      // Could add different credentials for test if required
      dist: {
        options: {
          patterns: [
            {
              match: 'GOOGLE_ANALYTICS_KEY',    // replace @@GOOGLE_ANALYTICS_KEY
              replacement: '<%= credentials().GoogleAnalyticsKey %>'
            },
            {
              match: 'GOOGLE_ANALYTICS_HOST',   // replace @@GOOGLE_ANALYTICS_HOST
              replacement: '<%= credentials().GoogleAnalyticsHost %>'
            }
          ],
          force: true
        },
        files: [
          {expand: true, flatten: true, src: ['<%= yeoman.distTmp %>/index.html'], dest: '<%= yeoman.distTmp %>'}
        ]
      }
    },

    // Performs rewrites based on rev and the useminPrepare configuration
    usemin: {
      html: ['<%= yeoman.distTmp %>/{,*/}*.html', '<%= yeoman.distTmp %>/**/*.html'],
      css: ['<%= yeoman.distTmp %>/styles/{,*/}*.css'],
      options: {
        assetsDirs: ['<%= yeoman.distTmp %>', '<%= yeoman.distTmp %>/styles/fonts/', '<%= yeoman.distTmp %>/images/']
//        patterns: {
//          css: [[/url\(\s*['']?([^''\)]+)['']?\s*\)/img, 'Replacing reference to urls']] // FIXME While usemin won't have full support for revved files we have to put all references manually here
//        }

      }
    },

    // The following *-min tasks produce minified files in the dist folder
    imagemin: {
      dist: {
        files: [{
          expand: true,
          cwd: '<%= yeoman.app %>/images',
          src: '{,*/}*.{png,jpg,jpeg,gif}',
          dest: '<%= yeoman.distTmp %>/images'
        }]
      }
    },
    svgmin: {
      dist: {
        files: [{
          expand: true,
          cwd: '<%= yeoman.app %>/images',
          src: '{,*/}*.svg',
          dest: '<%= yeoman.distTmp %>/images'
        }]
      }
    },
    htmlmin: {
      dist: {
        options: {
          collapseWhitespace: true,
          collapseBooleanAttributes: true,
          removeCommentsFromCDATA: true,
          removeOptionalTags: true
        },
        files: [{
          expand: true,
          cwd: '<%= yeoman.distTmp %>',
          src: ['*.html', '**/*.html'],
          dest: '<%= yeoman.distTmp %>'
        }]
      }
    },

    // Convert templates into js
    ngtemplates:    {
      app:          {
        cwd:      '<%= yeoman.distTmp %>',
        src:        '**/**.html',
        dest:       '<%= yeoman.tmp %>/js/templates/app-templates.js',
        options:    {
          module:   'anApp',
//          htmlmin:  '<%= htmlmin.app %>',
          collapseBooleanAttributes:      true,
          collapseWhitespace:             true,
          removeAttributeQuotes:          true,
          removeEmptyAttributes:          true,
          removeRedundantAttributes:      true,
          removeScriptTypeAttributes:     true,
          removeStyleLinkTypeAttributes:  true

//          url:    function(url) { return url.replace('.html', ''); }
        }
      }
    },
    // Allow the use of non-minsafe AngularJS files. Automatically makes it
    // minsafe compatible so Uglify does not destroy the ng references
    ngmin: {
      dist: {
        files: [{
          expand: true,
          cwd: '<%= yeoman.tmp %>/concat/js',
          src: '*.js',
          dest: '<%= yeoman.tmp %>/concat/js'
        }]
      },
      templates: {
        files: [{
          expand: true,
          cwd: '<%= yeoman.tmp %>/js/templates',
          src: '*.js',
          dest: '<%= yeoman.tmp %>/js/templates'
        }]

      }
    },

    uglify: {
      templates: {
        files: [{
          expand: true,
          cwd: '<%= yeoman.tmp %>/js/templates',
          src: '*.js',
          dest: '<%= yeoman.tmp %>/js/templates-ugly'
        }]
      }
    },

    // Remove unused CSS across multiple files and ignore specific selectors
    uncss: {
      dist: {
        files: {
          '<%= yeoman.distTmp %>/styles/app.css': ['<%= yeoman.distTmp %>/index.html','<%= yeoman.distTmp %>/**/*.html']
        }
      },
      options: {
        csspath: '../../<%= yeoman.distTmp %>/',
        ignore: ['#added_at_runtime', /\.in/, /\.collapsing/, /\.open/, /\.growl/, /\.alert/, /\.close/, /\.ng-invalid/, /disabled/]
      }
    },

    // Replace Google CDN references
    cdnify: {
      dist: {
        html: ['<%= yeoman.distTmp %>/*.html']
      }
    },

    // Copies remaining files to places other tasks can use
    copy: {
      dist: {
        files: [{
          expand: true,
          dot: true,
          cwd: '<%= yeoman.app %>',
          dest: '<%= yeoman.distTmp %>',
          src: [
            '*.{ico,png,txt}',
            '.htaccess',
            '*.html',
            '**/*.html',
            'images/{,*/}*.{webp}',
            'styles/fonts/*'
          ]
        },
        {
          expand: true,
          cwd: '<%= yeoman.tmp %>/images',
          dest: '<%= yeoman.distTmp %>/images',
          src: ['generated/*']
        }]
      },
      css: {
        files: [{
          expand: true,
          dot: true,
          cwd: '<%= yeoman.tmp %>/concat/styles',
          dest: '<%= yeoman.distTmp %>',
          src: [
            'styles/*.css'
          ]
        }]
      },
      distFinal: {
        files: [{
          expand: true,
          dot: true,
          cwd: '<%= yeoman.distTmp %>',
          dest: '<%= yeoman.dist %>',
          src: [
            '*.{ico,png,txt}',
            '.htaccess',
            '*.html',
            'images/**/*',
            'js/**/*',
            'styles/**/*'

          ]
        }]
      }
    },

    // Run some tasks in parallel to speed up the build process
    concurrent: {
      server: [
        'compass:server'
      ],
      test: [
        'compass'
      ],
      dist: [
        'compass:dist',
        'imagemin',
        'svgmin'
      ]
    },

    'git-describe': {
      'options': {
        // Task-specific options go here.
      },
      'cwd': {
        // Target-specific file lists and/or options go here.
      }
    },

    s3: {
      options: {
        accessKeyId: '<%= credentials().AwsAccessKeyId %>',
        secretAccessKey: '<%= credentials().AwsSecretAccessKey %>',
        bucket: Config.bucket,
        region: Config.region,
        createBucket: true,
        enableWeb: true,
        headers: {
          CacheControl: 630720000,
          Vary: 'Accept-Encoding',
          Expires: new Date('2050')
        }
      },
      nonHtml: {
        cwd: 'dist',
        src: '**',
        options: {
          headers: {
            CacheControl: 630720000, //max-age=630720000, public
            Expires: new Date('2050') //Sat, 01 Jan 2050 00:00:00 GMT
          }
        }
      },
      html: {
        cwd: 'dist',
        src: '*.html',
        options: {
          headers: {
            ContentType: 'text/html;charset=\'UTF-8\'',
            CacheControl: 630720000, //max-age=630720000, public
            Expires: new Date('2050') //Sat, 01 Jan 2050 00:00:00 GMT
          }
        }
      }
    },

  // By default, your `index.html`'s <!-- Usemin block --> will take care of
    // minification. These next options are pre-configured if you do not wish
    // to use the Usemin blocks.
    cssmin: {
       dist: {
         files: {
           '<%= yeoman.distTmp %>/styles/app.css': [
             '<%= yeoman.distTmp %>/styles/app.css'
           ]
         }
       },
      tmp: {
        files: {
          '<%= yeoman.distTmp %>/styles/app.css': [
            '<%= yeoman.tmp %>/styles/app.css'
          ]
        }
      }

    },
    // uglify: {
    //   dist: {
    //     files: {
    //       '<%= yeoman.distTmp %>/js/scripts.js': [
    //         '<%= yeoman.distTmp %>/js/scripts.js'
    //       ]
    //     }
    //   }
    // },
    // concat: {
    //   dist: {}
    // },

    templatesConcat: {
      src: '<%= yeoman.distTmp %>/js/app.*.js',
      templates: '<%= yeoman.tmp %>/js/templates-ugly/app-templates.js',
      dest: '<%= yeoman.dist %>/js/app.*.js',
      index:'<%= yeoman.dist %>/index.html'
    },

    // Test settings
    karma: {
      unit: {
        configFile: 'test/karma.conf.js',
        singleRun: true
      },
      watch: {
        configFile: 'test/karma.conf.js',
        singleRun: false,
        background: true
      },
      headless: {
        configFile: 'test/karma.conf.js',
        browsers: ['PhantomJS'],
        singleRun: true
      }
    },

    protractor: {
      options: {
//        configFile: 'test/protractor-cuke-conf.js', // Default config file
        keepAlive: true, // If false, the grunt process stops when the test fails.
        noColor: false // If true, protractor will not use colors in its output.
      },
      jasmine: {
        options: {
          configFile: 'test/protractor.conf.js', // Default config file
          args: {
            chromeOnly: true,
            framework:'jasmine',
            specs: ['test/e2e/spec/**/*.js'],
            baseUrl: 'http://0.0.0.0:' + Config.test.port + '/',
            capabilities: {
              // Possible values are chrome, firefox, safari, ei, and phantomjs
              'browserName': 'chrome'
            }

          } // Target-specific arguments
        }
      },

      test: {
        options: {
          configFile: 'test/protractor.conf.js', // Default config file

          args: {
            chromeOnly: true,
            framework:'cucumber',
            specs: ['test/cuke/features/*.feature'],

            baseUrl: 'http://0.0.0.0:' + Config.test.port + '/',
            capabilities: {
              // Possible values are chrome, firefox, safari, ei, and phantomjs
              'browserName': 'chrome'
            }

          } // Target-specific arguments
        }
      },
      dist: {
        options: {
          configFile: 'test/protractor-cuke-chrome-conf.js', // Default config file
          args: {
            chromeOnly: true,

            baseUrl: 'http://0.0.0.0:' + Config.e2e.port + '/',
            capabilities: {
              // Possible values are chrome, firefox, safari, ei, and phantomjs
              'browserName': 'chrome'
            }

          } // Target-specific arguments
        }
      },
      desktops: {
        options: {
          configFile: 'test/protractor-cuke-desktops-conf.js', // Default config file
          args: {
            baseUrl: 'http://0.0.0.0:' + Config.e2e.port + '/',
            capabilities: {
              // Possible values are chrome, firefox, safari, ei, and phantomjs
              'browserName': 'chrome'
            }

          } // Target-specific arguments
        }
      },
      saucelabs: {
        options: {
          configFile: 'test/protractor-cuke-saucelabs-conf.js', // Default config file
          args: {
//            baseUrl: 'http://0.0.0.0:' + Config.e2e.port + '/',
            baseUrl: 'https://dfn5o40jhevtv.cloudfront.net',
            sauceUser: process.env.SAUCE_USERNAME,
            sauceKey: process.env.SAUCE_ACCESS_KEY,
            name: Config.project,
            tags: ['e2e'],
            build: '"' + process.env.TRAVIS_JOB_NUMBER + '"'
          }
        }
      },
      saucelabsWin: {
        options: {
          configFile: 'test/protractor-cuke-saucelabs-win-conf.js', // Default config file
          args: {
//            baseUrl: 'http://0.0.0.0:' + Config.e2e.port + '/',
            baseUrl: 'https://dfn5o40jhevtv.cloudfront.net',
            sauceUser: process.env.SAUCE_USERNAME,
            sauceKey: process.env.SAUCE_ACCESS_KEY,
            name: Config.project,
            tags: ['e2e'],
            build: '"' + process.env.TRAVIS_JOB_NUMBER + '"'
          }
        }
      },
      saucelabsDev: {
        options: {
          configFile: 'test/protractor-cuke-saucelabs-dev-conf.js', // Default config file
          args: {
//            baseUrl: 'http://127.0.0.1:' + Config.test.port + '/',
            baseUrl: 'https://dfn5o40jhevtv.cloudfront.net',
            sauceUser: process.env.SAUCE_USERNAME,
            sauceKey: process.env.SAUCE_ACCESS_KEY,
            capabilities: {
              // Possible values are chrome, firefox, safari, iexplore, and phantomjs
              build:'Local',
              name: 'MAS - Client',
              platform: 'Windows 7',
              'browserName': 'iexplore',
              version: 8
            }
          }
        }
      }
    },

    // Static analysis with Plato
    plato: {
      report: {
        options : {
          jshint : grunt.file.readJSON('.jshintrc'),
          title: 'Mick Angular Seed',
          recurse: true,
          dir: 'report',
          exclude: /_test\.js$/
        },
        files: {
          'report': ['app']
        }
      }
    },

    changelog: {
      options: {
        // Task-specific options go here.
      }
    },

    bump: {
      options: {
        files: ['package.json'],
        updateConfigs: [],
        commit: true,
        commitMessage: 'Release v%VERSION%',
        commitFiles: ['package.json', 'CHANGELOG.md'],
        createTag: true,
        tagName: 'v%VERSION%',
        tagMessage: 'Version %VERSION%',
        push: true,
        pushTo: 'origin',
        gitDescribeOptions: '--tags --always --abbrev=1 --dirty=-d'
      }
    }


  });

  // Serve
  grunt.registerTask('serve', [
    'clean:server',
    'wiredep',
    'concurrent:server',
    'jshint:all',
    'autoprefixer',
    'express:dev',
    'karma:watch:start',
    'watch'
  ]);

  grunt.registerTask('serve:dist', [
    'build',
    'express:production',
    'watch'
  ]);

  grunt.registerTask('serve:ie8', [
    'clean:server',
    'wiredep',
    'compass:ie8',
    'jshint:all',
    'autoprefixer',
    'express:dev',
    'karma:watch:start',
    'watch'
  ]);



  grunt.registerTask('server', function () {
    grunt.log.warn('The `server` task has been deprecated. Use `grunt serve` to start a server.');
    grunt.task.run(['serve']);
  });

  grunt.registerTask('test', [
    'clean:server',
    'concurrent:test',
    'jshint:all',
    'autoprefixer',
    'karma:headless'
  ]);




  grunt.registerTask('e2e', function (target) {
    if (target === 'dist') {
      return grunt.task.run([
        'build',
        'express:production:start',
        'protractor:dist',
        'express:production:stop'
      ]);
    }
    if (target === 'desktops') {
      return grunt.task.run([
        'build',
        'express:production:start',
        'protractor:desktops',
        'express:production:stop'
      ]);
    }
    if (target === 'jasmine') {
      return grunt.task.run([
        'express:test:start',
        'protractor:jasmine',
        'express:test:stop'
      ]);
    }
    // Always do saucelabs with a dist build
    if (target === 'saucelabs') {
      return grunt.task.run([
        'build',
        'express:production:start',
        'protractor:saucelabs',
        'express:production:stop'
      ]);
    }
    if (target === 'saucelabsDev') {
      return grunt.task.run([
        'clean:server',
        'compass:ie8',
        'autoprefixer',
        'express:test:start',
        'protractor:saucelabsDev',
        'express:test:stop'
      ]);
    }

    grunt.task.run([
      'clean:server',
      'concurrent:server',
      'autoprefixer',
      'express:test:start',
      'protractor:test',
      'express:test:stop'
    ]);
  });

  grunt.registerTask('travis', [
    'test',
    'build',
    'express:production:start',
    'protractor:saucelabs',
    'protractor:saucelabsWin',
    'express:production:stop'
  ]);


  grunt.registerTask('build', [
  'clean:dist',
    'gitRevision',
    'useminPrepare',
    'concurrent:dist',
    'autoprefixer',
    'concat',
    'ngmin',
    'copy:dist',
    'replace:dist',
    'cdnify',
    'copy:css',
    'cssmin:tmp',
    'uncss',
    'cssmin:dist',
    'uglify',
    'filerev',
    'usemin',
    'htmlmin',
    'ngtemplates',
    'ngmin:templates',
    'uglify:templates',
    'copy:distFinal',
    'templatesConcat'
  ]);


  grunt.registerTask('default', [
    'newer:jshint',
    'test',
    'build'
  ]);

  grunt.registerTask('gitRevision', function() {
    grunt.event.once('git-describe', function (rev) {
      grunt.log.writeln('Git Revision:   ' + rev);
      grunt.log.writeln('Git rev tag:    ' + rev.tag);
      grunt.log.writeln('Git rev object: ' + rev.object); // The 6 character commit SHA by itself
      grunt.log.writeln('Git rev dirty:  ' + rev.dirty);   // A flag denoting whether all local changes are committed
      grunt.option('gitRevision', rev);
      grunt.option('gitTag', rev.tag);
      grunt.option('gitObj', rev.object);
    });
    grunt.task.run('git-describe');
  });

  grunt.registerTask('deploy', [
    'gitRevision',
    's3'
  ]);


  grunt.registerTask('templatesConcat', 'concat your templates js to your app js file.', function() {
    // Fail task if config props are missing.

    var crypto = require('crypto');
    var path = require('path');

    var singleFile = function (fileFilter) {
      var files = grunt.file.expand(fileFilter);

      if (files.length !== 1) {
        grunt.fail.fatal(fileFilter + ' did not match a single file, returned ' + files.join(', '));
      }
      return files[0];
    };

    this.requiresConfig(['templatesConcat', 'src']);
    this.requiresConfig(['templatesConcat', 'templates']);
    this.requiresConfig(['templatesConcat', 'dest']);
    this.requiresConfig(['templatesConcat', 'index']);
    this.requiresConfig(['filerev', 'options']);

    this.config = {};
    this.config.src       = grunt.config.get('templatesConcat.src');
    this.config.templates = grunt.config.get('templatesConcat.templates');
    this.config.dest      = grunt.config.get('templatesConcat.dest');
    this.config.index     = grunt.config.get('templatesConcat.index');
    this.config.options   = grunt.config.get('filerev.options');
    this.config.filerev   = grunt.filerev;
    // Log... conditionally.
    grunt.verbose.ok('Config. ' + JSON.stringify(this.config));


    // Concat the two files together
    var src   = grunt.file.read(singleFile(this.config.src));
    var templ = grunt.file.read(this.config.templates);
    var index = grunt.file.read(this.config.index);

    var out = src.concat(templ);

    var file = singleFile(this.config.dest);

    var hash = crypto.createHash(this.config.options.algorithm).update(out, this.config.options.encoding).digest('hex');
    var suffix = hash.slice(0, this.config.options.length);
    var oldHash = crypto.createHash(this.config.options.algorithm).update(src, this.config.options.encoding).digest('hex');
    var oldSuffix = oldHash.slice(0, this.config.options.length);

    var oldBasename = path.basename(file);
    var basename = oldBasename.replace(oldSuffix, suffix);
    if (oldBasename === basename) {
      grunt.log.error('Dest ' + this.config.dest + ' did not have a the expected hash of ' + oldSuffix);
    }
    grunt.verbose.ok('File was ' + oldBasename + ' now ' + basename);
    var newName = path.join(path.dirname(file), basename);

    // Update index.html file with new js file
    var newIndex = index.replace(oldBasename, basename);

    if (index === newIndex) {
      grunt.log.error('Index ' + this.config.index + ' did not have a the app js file of ' + oldBasename);
    }

    // Write app file
    grunt.file.write(newName, out);

    // Write index file
    grunt.file.write(this.config.index, newIndex);

    // Delete old file
    grunt.file.delete(file);

    grunt.log.ok('Written file ' + newName);
  });
};
