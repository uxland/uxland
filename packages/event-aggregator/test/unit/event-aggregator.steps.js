import { defineFeature, loadFeature } from 'jest-cucumber';
import path from 'path';
import { eventAggregator } from '../../src/event-aggregator';

const subscribeFeature = loadFeature(path.join(__dirname, './event-aggregator.subscribe.feature'));
defineFeature(subscribeFeature, defineScenario => {
  defineScenario('An event is subscribed', ({ given, and, when, then }) => {
    let EA;
    let event;
    let callback;
    let subscription;
    given('An event aggregator', () => {
      EA = eventAggregator;
    });
    and('An event', () => {
      event = 'EVENT::DUMMY';
    });
    and('A callback', () => {
      callback = console.log;
    });
    when('Subscribed with the event aggregator', () => {
      subscription = EA.subscribe(event, callback);
    });
    then('Event aggregator has the event registered', () => {
      expect(EA.eventLookup[event]).toBeDefined();
    });
    then('The callback is associated to that event', () => {
      expect(EA.eventLookup[event][0]).toEqual(callback);
    });
    then('A subscriber must be returned', () => {
      expect(subscription).toBeDefined();
    });
  });
  defineScenario('Unsubscribe an event', ({ given, and, when, then }) => {
    let EA;
    let event = 'EVENT::DISPOSE';
    let subscription;
    given('An event aggregator', () => {
      EA = eventAggregator;
    });
    and('An event is subscribed', () => {
      subscription = EA.subscribe(event, console.log);
    });
    when('Dispose is called', () => {
      subscription.dispose();
    });
    then('Event must be unsubscribed', () => {
      expect(EA.eventLookup[event].length).toEqual(0);
    });
  });
});

const publishFeature = loadFeature(path.join(__dirname, './event-aggregator.publish.feature'));
defineFeature(publishFeature, defineScenario => {});
