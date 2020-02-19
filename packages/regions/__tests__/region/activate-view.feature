Ability: Activate a view into a region

  Scenario: Activate a view
    Given A region
    And A view key
    When The view is deactivated
    Then Return the region with this one activate

  Scenario: Activate a view already active
    Given A region
    And A view key
    When The view is activated
    Then Throw an error 'View already active'