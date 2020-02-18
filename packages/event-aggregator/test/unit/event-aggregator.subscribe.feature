Business Need: Event management
Need of a event manager in order to communicate between different layers of an application

Feature: Event Aggregator Subscription
    Scenario: An event is subscribed
        Given An event aggregator
        And An event
        And A callback
        When Subscribed with the event aggregator
        Then Event aggregator has the event registered
        And The callback is associated to that event
        And A subscriber must be returned
    Scenario: Unsubscribe an event
        Given An event aggregator
        And An event is subscribed
        When Dispose is called
        Then Event must be unsubscribed