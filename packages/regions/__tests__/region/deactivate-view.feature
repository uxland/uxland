Ability: Deactivate a view into a region

  Scenario: Deactivate a view
    Given A region
    And A view key
    When The view is activated
    Then Return the region with this one deactivate

  Scenario: Deactivate a view already inactive
    Given A region
    And A view key
    When The view is deactivated
    Then Throw an error 'View already inactive'