Ability: Find active views in a region

  Scenario: Get actives views from a region
    Given A region
    When Want to know all actives views
    Then Return them

  Scenario: Know actives views from a region
    Given A region
    When Region have not any active view
    Then Return an empty item