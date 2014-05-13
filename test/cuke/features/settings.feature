Feature: Settings
  As an authenticated user
  I want to see my settings
  So that I can view and update them

#  Background:
#    Given The user is not logged in

  @dev
  Scenario: View my settings
    Given an authenticated user
    When  I go to the settings page
    Then  I can view my settings.

