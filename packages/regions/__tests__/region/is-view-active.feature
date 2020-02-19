Feature: Know if a view is active

  Scenario: Know the activity of a view
    Given A region
    And A view key
    When A view is active or inactive
    Then Return the activity of a view