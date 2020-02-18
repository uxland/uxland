Business Need: Adding a view into a Region

  Scenario: A view is added to a region
    Given A region
    And A view
    When Added to a region
    Then The region contains de view

  Scenario: A invalid view is added to a region
    Given A region
    And A view not defined
    When Added to a region
    Then Should raise an error 'Invalid view object'

