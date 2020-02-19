Business Need: Find a view in a region

  Scenario: Get a view from a region
    Given A region
    And A key from view
    When Exists view in the region
    Then Return this view

  Scenario: Get a invalid view from a region
    Given A region
    And A key from view
    When Not exists view in the region
    Then Should raise an error 'This view not exists on region'
