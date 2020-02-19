Business Need: Removing a view from region

  Scenario: A view is removed from a Region
    Given A region
    And A valid view to remove
    When Removing the view
    Then return the region without the region removed

  Scenario: Trying to remove invalid view from region
    Given A region
    And A invalid object view not defined
    And A invalid object view key
    When Removing the view
    Then Throw an error 'Invalid view object'

    Scenario: Trying to remove a view from region
      Given A region
      And A view
      When View not exist on region
      Then Throw an error 'This view not exists on region'
