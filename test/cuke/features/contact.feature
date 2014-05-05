Feature: Contact Page
  As new user to the site
  I want to see how to contact the author
  So that I can gain more information about the site

#  Background:
#    Given The user is not logged in

  Scenario: Contact Page has a link to about
    Given A user
    When  I go to the contact page
    Then  I can navigate to the about page.

