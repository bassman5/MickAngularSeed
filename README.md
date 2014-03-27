## This is an AngularJS Application with testing and distribution build configured

Install
```
git clone https://github.com/bassman5/MickAngularSeed.git myapp
cd myapp
npm install 
bower install
```
Must have node and grunt globally installed first
Also protractor needs some setup see https://github.com/angular/protractor/blob/master/docs/getting-started.md
I have installed locally in the project rather than globally so after initial installation run
```
./node_modules/protractor/bin/webdriver-manager update
```

### Aims

* A seed project that incorporates AngularJS best practices
* Fully configured testing, both unit (with code coverage reports) and end-2-end
* Distribution build configured to combine, minify and timestamp js, css, and images
* File update watcher to run tests and auto re-load assets
* JShint checking all js files (reduced level for test files)
* Bower package management
* Yeoman.io scaffolding with html5boilerplate

#### Still to do
* DONE - Remove bower_components from the dist (but we do need sass-bootstrap/fonts)
* IN PROGRESS - Add uncss grunt plugin to remove unused sccs selectors
* Add more examples of ui-router, something more app like for the main page
* Add authentication, an auth service
* Fix the yeoman scaffolding to generate the correct structure and test files

#### Best Practices
I have tried to follow the guides from Google at
[http://blog.angularjs.org/2014/02/an-angularjs-style-guide-and-best.html]

**Updated 27/Mar/14**
Now test and scss files co-located with source files

JShint config is different for test files
grunt build (or serve:dist) will now package minified files (and uncss to minify css), images and fonts with cache busting ids

I have also not used multiple modules, just one module for all code.
As I don't expect this to be a massive app, minified code I believe is enough. Also module lazy loading is coming in Angular 2.0, will re-look at it then.
I expect this to change

### Fully configured testing
For unit testing, karma is configured with mocha. Mocha has much better async testing support (although version 2.0 is much better).

#### Build

It is important that we follow pagespeed guidelines.
```
grunt build
```
Create a 'dist' directory with minified js, css, images, & html.

```
grunt serve
```
Load the app in an http server, watch for changes, run sass, jshint, and karma unit tests with coverage reports
The coverage reports are generated in coverage/Chrome 33.0.1750 (Mac OS X 10.9.2)/index.html
Note the directory changes with Chrome version and machine OS version

```
grunt serve:dist
```
Create a 'dist' directory with minified js, css, images, & html and serve from an http server.
```
grunt karma:watch:start watch
```
for just the unit tests

```
grunt compass
````
Will generate css (this is done automatically in watch)


#### For e2e test (protractor / webdriver )

Start server (NOT NEEDED just run protractor)
```
./node_modules/protractor/bin/webdriver-manager start
```

run tests with
```
./node_modules/protractor/bin/protractor protractor-conf.js
```



#### Intellij Idea 13+ or Webstorm 7+
You can use the node.js plugin (seperate install) with '/usr/local/bin/grunt' as the JavaScript file and 'serve' as the Application Parameter
Also there is a great karma plugin (seperate install) Karam Node package is $(PROJECT_DIR)node-modules/karma and the Configuration file is test/karma-conf.js
To debug tests in WebStorm or Idea add a run configuration of Karma with the test/karma-conf.js file and you can run (with coverage)
or set breakpoints and debug in ide.


