# This is AngularJS Application with testing configured

In intellij command line tool run
grunt serve
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

To debug tests in WebStorm or Idea add a run configuration of Karma with the karma.conf.js file and you can run (with coverage)
or set breakpoints and debug in ide.

For e2e test (protractor / webdriver )

Start server
./node_modules/protractor/bin/webdriver-manager start
run tests with
./node_modules/protractor/bin/protractor protractor-conf.js


