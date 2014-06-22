'use strict';

var gulp = require('gulp'),
  jshint = require('gulp-jshint'),
  karma = require('karma').server,
  gutil = require('gulp-util'),
  plato = require('gulp-plato'),
  clean = require('gulp-clean'),
  nodemon = require('gulp-nodemon'),
  sass = require('gulp-ruby-sass'),
  autoprefixer = require('gulp-autoprefixer'),
//  minifycss = require('gulp-minify-css'),
//  jshint = require('gulp-jshint'),
//  uglify = require('gulp-uglify'),
//  imagemin = require('gulp-imagemin'),
//  rename = require('gulp-rename'),
//  concat = require('gulp-concat'),
//  notify = require('gulp-notify'),
//  cache = require('gulp-cache'),
  livereload = require('gulp-livereload'),
  fs = require('fs');


var yeoman = {
  app: 'app',
  test: 'test',
  temp: '.tmp',
  dist: 'dist'
};

var Config = {
  project: 'MAS',
  bucket: 'angularseed',
//    region: 'us-west-1',
  region: 'us-east-1',
  app: {
    js: [
      'gulpfile.js',
      yeoman.app + '/*.js',
      yeoman.app + '/**/*.js',
      '!' + yeoman.app + '/**/*_test.js'
    ],
    html: [yeoman.app + '/*.html',
        yeoman.app + '/**/*.html'],
    jsTest: [
      yeoman.app + '/**/*_test.js',
      yeoman.test + '/**/*.js',
      '!' + yeoman.test + '/server/node_modules/**/*.js'
    ],
    sassMain: yeoman.app + '/styles/app.scss',
    style: yeoman.app + '/**/*.scss'
  },

  dev: {
    port: 9000
  },
  test: {
    dir: 'test',
    port: 9001
  },
  e2e: {
    port: 9002
  },
  prod: {
    port: 9002
  }
};

gulp.task('default', ['test'], function() {
  // place code for your default task here
});

// Lint Task

var jshintopts = {};
jshintopts.options = JSON.parse(fs.readFileSync( __dirname + '/.jshintrc' ));
jshintopts.globals = jshintopts.options.globals;
delete jshintopts.options.globals;

gulp.task('lint-app', function() {
  return gulp.src(Config.app.js)
    .pipe(jshint())
    .pipe(jshint.reporter('jshint-stylish'))
    .pipe(jshint.reporter('fail'))
    .pipe(livereload());
});

gulp.task('lint-test', function() {
  return gulp.src(Config.app.jsTest)
    .pipe(jshint(yeoman.test + '/.jshintrc'))
    .pipe(jshint.reporter('jshint-stylish'))
    .pipe(jshint.reporter('fail'));
});

gulp.task('lint', ['lint-app', 'lint-test']);

gulp.task('watch', ['styles', 'lint', 'serve'], function() {
  // Create LiveReload server
  var server = livereload();


//  // Watch .scss files
  gulp.watch(Config.app.style, ['styles']);

  // Watch .js files
  gulp.watch(Config.app.js,     ['lint-app',  'test-unit']);
  gulp.watch(Config.app.jsTest, ['lint-test', 'test-unit']);

  // Watch .html files
  gulp.watch(Config.app.html).on('change', function(file) {
    server.changed(file.path);
  });


//  // Watch image files
//  gulp.watch('src/images/**/*', ['images']);


  // Watch any files in dist/, reload on change
  gulp.watch(['dist/**']).on('change', function(file) {
    server.changed(file.path);
  });





});

gulp.task('plato', function () {
  return gulp.src(Config.app.js)
    .pipe(plato('report', { // Directory name
      jshint : jshintopts,
      title: Config.project,
      quiet: true,
      recurse: false
    }));
});

gulp.task('test-unit', function () {
  return karma.start({
    configFile: process.cwd() + '/test/karma.conf.js',
    browsers: ['PhantomJS'], // 'Firefox', 'Chrome', 'PhantomJS'
    autoWatch: false,
    singleRun: true
  }, function (exitCode) {
    gutil.log('Karma has exited with ' + exitCode);
//    process.exit(exitCode);
  });
});


gulp.task('test', ['lint', 'test-unit', 'plato'], function () {});


gulp.task('clean', function() {
  return gulp.src([yeoman.dist, yeoman.temp], {read: false})
    .pipe(clean());
});

gulp.task('styles', function() {
  return gulp.src(Config.app.sassMain)
    .pipe(sass({ style: 'expended', precision: 10, sourcemap: true }))
    .pipe(autoprefixer('last 2 version', 'safari 5', 'ie 8', 'ie 9', 'opera 12.1', 'ios 6', 'android 4'))
    .pipe(gulp.dest(yeoman.temp + '/styles'))
    .pipe(livereload());
});

gulp.task('serve', function () {
  nodemon({
    script  : 'test/server/bin/www',
    env: { NODE_ENV: 'development', PORT: Config.dev.port },
    watch   : ['test/server/**/*.js', '!test/server/node_modules/**/*.js']
      //...add nodeArgs: ['--debug=5858'] to debug
      //..or nodeArgs: ['--debug-brk=5858'] to debug at server start
      }).on('start', function () {
        setTimeout(function () {
          livereload.changed();
        }, 500); // wait for the server to finish loading before restarting the browsers
        });
      });
