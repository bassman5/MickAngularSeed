Feature: Login
  As a registered user
  I want to login
  So that I can see my private information

#  Background:
#    Given The user is not logged in
  @dev
  Scenario: Normal Login
    Given A registered user
    When  I submit my correct authorization details
    Then  I can login.

  Scenario: Normal Logout
    Given An authenticated user
    When  I logout
    Then  I am not longer authenticated.

  Scenario: Not allow login with an invalid email
    Given A registered user
    When  I enter invalid email addresses
    Then  I am not allowed to login.

  Scenario: Not allow login with an invalid password
    Given A registered user
    When  I enter invalid password
    Then  I am not allowed to login.
