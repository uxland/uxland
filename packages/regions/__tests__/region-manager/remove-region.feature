Feature: Removing a region from layout

  Scenario: A region is removed from region manager
    Given A region manager
    And A region
    When Removed from region manager
    Then The region manager not contains the region

  Scenario: A not defined region is proposal for remove
    Given A region manager that contains some regions
    And A region
    When Delete a region but is not defined yet
    Then Should be raise an error as 'Region was not defined yet'

  Scenario: A invalid region to remove
    Given A region manager that contains some regions
    And A region who has an invalid object key
    And A region who is not defined
    When delete the region
    Then Raise an error as 'Invalid region object'