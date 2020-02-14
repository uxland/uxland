Business Need: Adding a region to a layout

  Scenario: A region is added to a region manager
    Given A region manager
    And A region
    When Added to the region manager
    Then The region manager contains the region

  Scenario: A duplicated region is added
    Given a region manager that contains a some regions
    And a region with same key that one of the region manager's regions
    When Adding the region to region manager
    Then an error is thrown with message 'RegionManager already contains a region with same key'

  Scenario: An invalid region is added
    Given a region manager
    And an invalid region
        * is an object
        * key property is not defined
    When Adding the region to the region manager
    Then an error is thrown with message 'Invalid region object'