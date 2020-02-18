Ability: Remove all the regions from region manager

  Scenario: All the regions be removed from region manager
    Given A region manager
    When remove all the regions
    Then region manager not contain any region