## This is an AngularJS Application with testing and distribution build configured

[![Build Status](http://img.shields.io/travis/bassman5/MickAngularSeed.svg)](https://travis-ci.org/bassman5/MickAngularSeed) [![Dependency Status](https://david-dm.org/bassman5/MickAngularSeed.svg?theme=shields.io)](https://david-dm.org/bassman5/MickAngularSeed) [![devDependency Status](https://david-dm.org/bassman5/MickAngularSeed/dev-status.svg?theme=shields.io)](https://david-dm.org/bassman5/MickAngularSeed#info=devDependencies)

[![Stories in Ready](https://badge.waffle.io/bassman5/mickangularseed.png?label=ready&title=Ready)](https://waffle.io/bassman5/mickangularseed)

### Prerequisites

[Install NodeJS](http://nodejs.org/download/)

[Install Compass](http://compass-style.org/install/)

```
npm install -g bower grunt-cli
```

### Install

```
git clone https://github.com/bassman5/MickAngularSeed.git myapp
cd myapp
npm install 
```

Validate install

```
npm test
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

## Best Practices
I have tried to follow the guides from Google at
[http://blog.angularjs.org/2014/02/an-angularjs-style-guide-and-best.html]

The style guide here
[https://github.com/mgechev/angularjs-style-guide]

#### JShint 
Configured differently for test files, so that the globals introduced by the testing framework are recognized without errors.

#### Modules
I have also not used multiple modules, just one module for all code.
As I don't expect this to be a massive app, minified code I believe is enough. Also module lazy loading is coming in Angular 2.0, will re-look at it then.
I expect this to change

#### Api as a service
The backend calls are managed as an Angular service built on [Restangular](https://github.com/mgonto/restangular).
There is an express server in test/server to provide the services for this app. Note I use version in the URL, may change this.

#### e2e Testing
Added Cucumber tests - to use grunt serve; grunt protractor:cucumber
Note that the home page is loaded at the start of the run and then navigateTo home page is done before each scenario
This is so that the page is only loaded once, don't use get in your tests unless you really need to.
Each Page (or page section) has a page object as described by [Selenium Page Objects](https://code.google.com/p/selenium/wiki/PageObjects)

#### Changelog
Generate a changelog using [connvetional-changelog](https://github.com/ajoslin/conventional-changelog).
This generates a README.md file for you based on [these commit conventions](https://docs.google.com/document/d/1QrDFcIiPjSLDn3EL15IJygNPiHORgU1_OOAqWjiDU5Y/).

#### Git Metadata available
Uses git metadata.

#### Release management
Creates git tags and updates your version numbers.

#### Deployment
Built artifacts are pushed to S3

#### Analytics
Integrated with Google Analytics see [angulartics](http://luisfarzati.github.io/angulartics/) for options, currently all page views are logged.
Put your google analytics ids in your .credentials.json file
```
  "GoogleAnalyticsKey": "UA-12345678-1",
  "GoogleAnalyticsHost": "awebsite.yourhost.net",
```

If you have a problem on a mac with grunt serve hanging add the following line to /etc/launchd.conf and reboot
```
limit maxfiles 16384 32768
```
The default open files limit is very low on macosx.

### Fully configured testing
For unit testing, karma is configured with Jasmine 2.

## Build

It is important that we follow pagespeed/YSlow guidelines.
Build will now package minified files (and uncss to minify css), images and fonts with cache busting ids, Angular html templates are converted to JS and included once.
URLs for assests, (JavaScript, CSS, Images, Fonts) include their hash code, so new files are generated when a file changes. Index.html is updated to contain the correct versions of the assets.

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


## For e2e test (protractor / webdriver )

Start server (NOT NEEDED just run chrome only driver)
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


## Intellij Idea 13+ or Webstorm 7+
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

## Deployment to s3

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

 * Create a `credentials.json` file like:

     ``` json
     {
       "accessKeyId": "...",
       "secretAccessKey": "..."
     }
     ```

## Code Quality Report
A report can be generated using [Plato JavaScript static code analysis](https://github.com/es-analysis/plato)
Run the code report with `npm run-script report`
A browser will open `report/index.html`

## Code Coverage Reports
Code coverage reports are created in the coverage directory every time you run the karma unit tests.
If you continue to run your karma tests with PhantomJS the html report is at `coverage/PhantomJS 1.9.7 (Mac OS X)/lcov-report/index.html` (note the PhantomJS directory changes with version numbers).




## Creating a release
The [grunt bump plugin](https://github.com/vojtajina/grunt-bump) is used.
To create a release
```
grunt bump-only:major # or minor, patch, build 
grunt changelog
grunt bump-commit
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


