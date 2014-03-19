# This is AngularJS Application with testing and distribution build configured

## Aims

* A seed project that incorporates AngularJS best practices
* Fully configured testing, both unit (with code coverage reports) and end-2-end
* Distribution build configured to combine, minify and timestamp js, css, and images
* File update watcher to run tests and auto re-load assets
* JShint checking all js files (reduced level for test files)
* Bower package management
* Yeoman.io scaffolding with html5boilerplate


### Best Practices
I have tried to follow the guides from Google at
[http://blog.angularjs.org/2014/02/an-angularjs-style-guide-and-best.html]
However, I could not get test files co-located with source files because:

1. JShint config is different for test files, they need the mocha / test globals defined

2. The Grunt dist package was made more complicated as you don't want test files in the distribution

I have also not used multiple modules, just one module for all code.
As I don't expect this to be a massive app, minified code I believe is enough. Also module lazy loading is coming in Angular 2.0, will re-look at it then.

### Fully configured testing
For unit testing, karma is configured with mocha. Mocha has much better async testing support (although version 2.0 is much better).



### Distribution Build

It is important that we follow pagespeed guidelines.
```
grunt build
```
Create a 'dist' directory with minified js, css, images, & html.

```
grunt serve
```
Load the app in an http server, watch for changes, run sass, jshint, and karma unit tests
```
grunt serve:dist
```
Load the app built in distribution mode in an http server


TODO
Remove bower_components from the dist (but we do need sass-bootstrap/fonts)




In intellij 13 use the node.js plugin with '/usr/local/bin/grunt' as the script file and 'serve' as a parameter, or from a command line.
```
grunt serve
```
or
grunt karma:watch:start watch
for just the tests

grunt serve:dist for a minified version

client coverage reports are run automatcally, view with
open client/coverage/Chrome\ 31.0\ \(Mac\)/index.html
also does compass
generate css with
grunt compass (it is done in watch)

grunt build packs everything into dist folder

To debug tests in WebStorm or Idea add a run configuration of Karma with the test/karma-conf.js file and you can run (with coverage)
or set breakpoints and debug in ide.

For e2e test (protractor / webdriver )

Start server
./node_modules/protractor/bin/webdriver-manager start
run tests with
./node_modules/protractor/bin/protractor protractor-conf.js


