
Feature: Login
  As a registered user
  I want to login
  So that I can see my private information

#  Background:

  Scenario: Normal Login
    Given A registered user with credentials "user@email.com" "aPassword"
    When  I submit my correct authorization details
    Then  I am fully authenticated.

  Scenario: Normal Logout
    Given An authenticated user
    When  I logout
    Then  I am not longer authenticated.

  Scenario: Do not allow login with an invalid email
    Given An unauthenticated user
    Then  I enter invalid email addresses
      |  Email     |
      |  e         |
      |  email@    |
      |  email@@   |
    Then  I am not allowed to login.

  Scenario: Not allow login with an invalid password
    Given An unauthenticated user
    Then  I enter invalid passwords
      | Passwords  |
      | e          |
      | aa         |
      | aaaaa      |
    Then  I am not allowed to login.
