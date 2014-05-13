Feature: About Page
  As new user to the site
  I want to see an overview
  So that I can gain more information about the site

#  Background:
#    Given The user is not logged in

  Scenario: About Page has a link to contacts
    Given A user
    When  I go to the about page
    Then  I can navigate to the contacts page.

