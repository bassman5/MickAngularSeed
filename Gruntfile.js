// Generated on 2014-02-16 using generator-angular 0.7.1
'use strict';

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


  // Define the configuration for all the tasks
  grunt.initConfig({

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
        files: ['<%= yeoman.app %>/**/*_test.js', 'test/**/*.js'],
        tasks: ['newer:jshint:test']
      },
      compass: {
        files: ['<%= yeoman.app %>/**/*.{scss,sass}'],
        tasks: ['compass:server', 'autoprefixer']
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
        port: 9000,
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
          port: 9001,
          base: [
            '.tmp',
            'test',
            '<%= yeoman.app %>'
          ]
        }
      },
      dist: {
        options: {
          base: '<%= yeoman.dist %>'
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


    // Compiles Sass to CSS and generates necessary files if requested
    compass: {
      options: {
        sassDir: '<%= yeoman.app %>/styles',
        cssDir: '<%= yeoman.tmp %>/styles',
        generatedImagesDir: '<%= yeoman.tmp %>/images/generated',
        imagesDir: '<%= yeoman.app %>/images',
        javascriptsDir: '<%= yeoman.app %>/js',
        fontsDir: '<%= yeoman.app %>/styles/fonts',
        importPath: 'bower_components',
        httpImagesPath: '/images',
        httpGeneratedImagesPath: '/images/generated',
        httpFontsPath: '/styles/fonts',
        relativeAssets: false,
        assetCacheBuster: false,
        raw: 'Sass::Script::Number.precision = 10\n'
      },
      dist: {
        options: {
          generatedImagesDir: '<%= yeoman.distTmp %>/images/generated'
        }
      },
      server: {
        options: {
          debugInfo: true
        }
      }
    },

    // Renames files for browser caching purposes
    rev: {
      options: {
        encoding: 'utf8',
        algorithm: 'md5',
        length: 8
      },
      dist: {
        files: {
          src: [
            '<%= yeoman.distTmp %>/js/{,*/}*.js',
            '<%= yeoman.distTmp %>/styles/{,*/}*.css',
            '<%= yeoman.distTmp %>/images/{,*/}*.{png,jpg,jpeg,gif,webp,svg}',
            '<%= yeoman.distTmp %>/styles/fonts/*'
          ]
        }
      }
    },



    // Reads HTML for usemin blocks to enable smart builds that automatically
    // concat, minify and revision files. Creates configurations in memory so
    // additional tasks can operate on them
    useminPrepare: {
      html: '<%= yeoman.app %>/index.html',
      options: {
//        root: '<%= yeoman.app %>',
        root: '.',
        dest: '<%= yeoman.distTmp %>'
      }

    },

    // Performs rewrites based on rev and the useminPrepare configuration
    usemin: {
      html: ['<%= yeoman.distTmp %>/{,*/}*.html', '<%= yeoman.distTmp %>/**/*.html'],
      css: ['<%= yeoman.distTmp %>/styles/{,*/}*.css'],
      options: {
        assetsDirs: ['<%= yeoman.distTmp %>', '<%= yeoman.distTmp %>/styles/fonts/', '<%= yeoman.distTmp %>/images/'],
        patterns: {
          css: [[/url\(\s*['']?([^''\)]+)['']?\s*\)/img, 'Replacing reference to urls']] // FIXME While usemin won't have full support for revved files we have to put all references manually here
        }

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
//          src: ['*.html'],
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
          '<%= yeoman.tmp %>/styles/app.css': ['<%= yeoman.app %>/index.html','<%= yeoman.app %>/**/*.html']
        }
      },
      options: {
        csspath: '../<%= yeoman.tmp %>/',
        ignore: ['#added_at_runtime', /\.open/, /\.ng-invalid/, /disabled/]
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

    aws: function() {
      return grunt.file.readJSON('.aws-credentials.json');  // Read the file
    },

    s3: {
      options: {
        accessKeyId: '<%= aws().accessKeyId %>',
        secretAccessKey: '<%= aws().secretAccessKey %>',
        bucket: 'angularseed',
        createBucket: true,
        enableWeb: true,
        headers: {
          CacheControl: 630720000, //max-age=630720000, public
          Expires: new Date('2050') //Sat, 01 Jan 2050 00:00:00 GMT
        }
      },
      build: {
        cwd: 'dist',
        src: '**'
      }
    },

  // By default, your `index.html`'s <!-- Usemin block --> will take care of
    // minification. These next options are pre-configured if you do not wish
    // to use the Usemin blocks.
    // cssmin: {
    //   dist: {
    //     files: {
    //       '<%= yeoman.distTmp %>/styles/main.css': [
    //         '<%= yeoman.tmp %>/styles/{,*/}*.css',
    //         '<%= yeoman.app %>/styles/{,*/}*.css'
    //       ]
    //     }
    //   }
    // },
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
      src: '<%= yeoman.distTmp %>/js/*.app.js',
      templates: '<%= yeoman.tmp %>/js/templates-ugly/app-templates.js',
      dest: '<%= yeoman.dist %>/js/*.app.js',
      index:'<%= yeoman.dist %>/index.html'
    },

    // Test settings
    karma: {
      unit: {
        configFile: 'test/karma-conf.js',
        singleRun: true
      },
      watch: {
        configFile: 'test/karma-conf.js',
        singleRun: false,
        background: true
      },
      headless: {
        configFile: 'test/karma-conf.js',
        browsers: ['PhantomJS'],
        singleRun: true
      }
    },

    protractor: {
      options: {
        configFile: "test/protractor-cuke-conf.js", // Default config file
        keepAlive: true, // If false, the grunt process stops when the test fails.
        noColor: false, // If true, protractor will not use colors in its output.
        args: {
          // Arguments passed to the command
        }
      },
      mocha: {
        options: {
          configFile: "test/protractor-conf.js", // Default config file
          args: {} // Target-specific arguments
        }
      },
      cucumber: {
        options: {
          configFile: "test/protractor-cuke-conf.js", // Default config file
          args: {} // Target-specific arguments
        }
      }
    }
  });


  grunt.registerTask('serve', function (target) {
    if (target === 'dist') {
      return grunt.task.run(['build', 'connect:dist:keepalive']);
    }

    grunt.task.run([
      'clean:server',
      'concurrent:server',
      'autoprefixer',
      'connect:livereload',
      'karma:watch:start',
      'watch'
    ]);
  });


  grunt.registerTask('server', function () {
    grunt.log.warn('The `server` task has been deprecated. Use `grunt serve` to start a server.');
    grunt.task.run(['serve']);
  });

  grunt.registerTask('test', [
    'clean:server',
    'concurrent:test',
    'newer:jshint:all',
    'autoprefixer',
    'connect:test',
    'karma:headless'
  ]);

  grunt.registerTask('build', [
    'clean:dist',
    'useminPrepare',
    'concurrent:dist',
    'uncss',
    'autoprefixer',
    'concat',
    'ngmin',
    'copy:dist',
    'cdnify',
    'cssmin',
    'uglify',
    'rev',
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
    this.requiresConfig(['rev', 'options']);

    this.config = {};
    this.config.src       = grunt.config.get('templatesConcat.src');
    this.config.templates = grunt.config.get('templatesConcat.templates');
    this.config.dest      = grunt.config.get('templatesConcat.dest');
    this.config.index     = grunt.config.get('templatesConcat.index');
    this.config.options   = grunt.config.get('rev.options');
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
