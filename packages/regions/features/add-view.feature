Feature: Add a view to a region

  Scenario: A new view is added to a empty region
    Given A region with no views
    When A view is added to the region
    Then The region should add the view to its view list

  Scenario: An existing view is added to a region
    Given A region with a few views
    Given A view with same key than a view into the region
    When  The view is added to the region
    Then An error is thrown

  Scenario: A new view is added to a populated region
    Given A region with a few views
    Given A view not contained in region
    When The view is added to region
    Then The region should add the view to its view list

