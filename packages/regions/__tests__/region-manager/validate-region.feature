Business Need: Validate a region

  Scenario: A region to validate
    Given A region manager
    And A region
    When Validate the region
    Then Return true if is a valid region

  Scenario: A invalid region for validate
    Given A region manager
    And A region is not defined
    And A region has invalid key property
    When Go to be added o removed from region manager
    Then Raise an error like 'Invalid region object'