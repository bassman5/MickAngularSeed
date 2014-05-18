## This is an AngularJS Application with testing and distribution build configured

[![Build Status](http://img.shields.io/travis/bassman5/MickAngularSeed.svg)](https://travis-ci.org/bassman5/MickAngularSeed) [![Code Climate](https://codeclimate.com/github/bassman5/MickAngularSeed.png)](https://codeclimate.com/github/bassman5/MickAngularSeed) [![Dependency Status](https://david-dm.org/bassman5/MickAngularSeed.svg?theme=shields.io)](https://david-dm.org/bassman5/MickAngularSeed) [![devDependency Status](https://david-dm.org/bassman5/MickAngularSeed/dev-status.svg?theme=shields.io)](https://david-dm.org/bassman5/MickAngularSeed#info=devDependencies)

Install
```
git clone https://github.com/bassman5/MickAngularSeed.git myapp
cd myapp
npm install 
```
Must have node and grunt globally installed first
Also protractor needs some setup see https://github.com/angular/protractor/blob/master/docs/getting-started.md
I have installed locally in the project rather than globally so after initial installation run
npm will install webdriver (following command)
```
./node_modules/.bin/webdriver-manager update
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
* DONE - Remove bower_components from the dist (but we do need sass-bootstrap/fonts) - you need to copy sass-bootstrap/fonts to /styles/fonts
* DONE - Add uncss grunt plugin to remove unused sccs selectors
* DONE - Add authentication, an auth service
* Add more examples of ui-router, something more app like for the main page
* Fix the yeoman scaffolding to generate the correct structure and test files

**Updated 27/Mar/14**
Now test and scss files co-located with source files

**Updated 3/May/14**
Added google analytics
Added login page with tests

**Updated 10/May/14**
Added Cucumber tests - to use grunt serve; grunt protractor:cucumber
Note that the home page is loaded at the start of the run and then navigateTo home page is done before each scenario
This is so that the page is only loaded once, don't use get in your tests unless you really need to.
Each Page (or page section) has a page object as described by [Selenium Page Objects](https://code.google.com/p/selenium/wiki/PageObjects)

#### Best Practices
I have tried to follow the guides from Google at
[http://blog.angularjs.org/2014/02/an-angularjs-style-guide-and-best.html]

The style guide here
[https://github.com/mgechev/angularjs-style-guide]

JShint config is different for test files
grunt build (or serve:dist) will now package minified files (and uncss to minify css), images and fonts with cache busting ids

I have also not used multiple modules, just one module for all code.
As I don't expect this to be a massive app, minified code I believe is enough. Also module lazy loading is coming in Angular 2.0, will re-look at it then.
I expect this to change

Each Page (or page section) has a page object as described by [Selenium Page Objects](https://code.google.com/p/selenium/wiki/PageObjects)

Generate a changelog using [connvetional-changelog](https://github.com/ajoslin/conventional-changelog).

Uses git metadata, based on [these commit conventions](https://docs.google.com/document/d/1QrDFcIiPjSLDn3EL15IJygNPiHORgU1_OOAqWjiDU5Y/).

If you have a problem on a mac with grunt serve hanging add the following line to /etc/launchd.conf and reboot
```
limit maxfiles 2048 10480
```
The default open files limit is very low on macosx.

### Fully configured testing
For unit testing, karma is configured with Jasmine 2.

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
```
Will generate css (this is done automatically in watch)


#### For e2e test (protractor / webdriver )

Start server (NOT NEEDED just run protractor)
```
./node_modules/.bin/webdriver-manager start
```

run tests with
```
grunt e2e
```
or
```
grunt e2e:dist
```
To run the e2e tests against a distribution build
Note this starts an express server (test/server) which has been generated from the express generator

```
grunt e2e:desktops
```
Will run chrome, safari, and firefox tests on a distribution build on the local machine

```
grunt e2e:saucelabs
```
Is designed to run multiple browser tests on SauceLabs on a distribution build, intended to run from Travis or your CI builder


#### Intellij Idea 13+ or Webstorm 7+
You can use the node.js plugin (seperate install) with '/usr/local/bin/grunt' as the JavaScript file and 'serve' as the Application Parameter
Also there is a great karma plugin (seperate install)

Karam Node package is $(PROJECT_DIR)node-modules/karma and the Configuration file is test/karma-conf.js
To debug tests in WebStorm or Idea add a run configuration of Karma with the test/karma-conf.js file and you can run (with coverage)
or set breakpoints and debug in ide.

To debug protractor tests, add a run configuration with
```
Node Interpreter:       /usr/local/bin/node (or wherever node is installed)
JavaScript file:        node_modules/protractor/lib/cli.js
Application Parameters: test/protractor-cuke-conf.js
```

#### Deployment to s3

See https://github.com/jpillora/grunt-aws for options
```
grunt build s3
```

Will push the dist fold to an s3 bucket defined in the options section
```
        bucket: "angularseed",
```

If you then add to a Cloudfront distribution you get 98/100 from ySlow and Pagespeed looks good too!

This task expects a file called .aws-credentials.json in you project root but be careful not to add to source control, this file has been added to .gitignore

 * Create a `.aws-credentials.json` file like:

     ``` json
     {
       "accessKeyId": "...",
       "secretAccessKey": "..."
     }
     ```



#### MIT License

Copyright &copy; 2014 Mick Dudley &lt;mick@dudley.uk.com&gt;

Permission is hereby granted, free of charge, to any person obtaining
a copy of this software and associated documentation files (the
'Software'), to deal in the Software without restriction, including
without limitation the rights to use, copy, modify, merge, publish,
distribute, sublicense, and/or sell copies of the Software, and to
permit persons to whom the Software is furnished to do so, subject to
the following conditions:

The above copyright notice and this permission notice shall be
included in all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED 'AS IS', WITHOUT WARRANTY OF ANY KIND,
EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF
MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT.
IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY
CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT,
TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE
SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.


