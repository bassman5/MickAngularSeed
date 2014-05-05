Feature: Home Page
  As new user to the site
  I want to see the initial CTA
  So that I can gain more information about the site

#  Background:
#    Given The user is not logged in

  Scenario: Initial View of the Home Page
    Given A user
    When  I go to the home page
    Then  I see the initial call to action.

  Scenario: Get more information
    Given A user
    When  I navigate to the about page
    Then  I see more information.

  Scenario: See contact information
    Given A user
    When  I navigate to the contact page
    Then  I see contact information.
