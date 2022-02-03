import {EventAggregator} from '../../event-aggregator';
describe('Given an event aggregator instance', () => {
  const dummyEvent = 'DUMMY-EVENT';
  const emptyEvent = 'EMPTY-EVENT';
  let callback;
  const payload = {foo: 'bar'};
  let EA: EventAggregator;

  describe('when subscribing once to an event', () => {
    beforeAll(() => {
      EA = new EventAggregator();
      callback = jest.fn();
    });
    afterAll(() => {
      EA = null;
      callback.mockClear();
    });
    it('should have event in subscribed events dictionary', () => {
      EA.subscribeOnce(dummyEvent, callback);
      expect(EA.eventLookup[dummyEvent]).toBeDefined();
    });
    it('should delete event from subscribed events dictionary after publishing', () => {
      EA.publish(dummyEvent, payload);
      expect(EA.eventLookup[dummyEvent]).toEqual([]);
    });
  });

  describe('when subscribing an event', () => {
    beforeAll(() => {
      EA = new EventAggregator();
      callback = jest.fn();
    });
    afterAll(() => {
      EA = null;
      callback.mockClear();
    });
    describe('and no event is provided', () => {
      it('should throw an error', () => {
        //@ts-ignore
        expect(() => EA.subscribe()).toThrowError('Event channel/type is invalid.');
      });
    });
    describe('and event is string', () => {
      it('should have event in subscribed events dictionary', () => {
        EA.subscribe(dummyEvent, callback);
        expect(EA.eventLookup[dummyEvent]).toBeDefined();
      });
      it('should call callback when event is published', () => {
        EA.publish(dummyEvent, payload);
        expect(callback).toHaveBeenCalledTimes(1);
        expect(callback).toHaveBeenLastCalledWith(payload, dummyEvent);
      });
    });
    describe('and event is an instance of Klass', () => {
      it('should add a messageHandler', () => {
        class Klass {}
        expect(EA.messageHandlers.length).toEqual(0);
        EA.subscribe(Klass, callback);
        expect(EA.messageHandlers.length).toEqual(1);
      });
    });
    describe('and disposing subscription', () => {
      it('should delete subscribed event callback from subscribed events dictionary', () => {
        const subscription = EA.subscribe('DISPOSE-EVENT', callback);
        expect(EA.eventLookup['DISPOSE-EVENT']).toBeDefined();
        subscription.dispose();
        expect(EA.eventLookup['DISPOSE-EVENT']).toEqual([]);
      });
    });
  });
  describe('when publishing an event', () => {
    beforeAll(() => {
      EA = new EventAggregator();
      callback = jest.fn();
    });
    afterAll(() => {
      EA = null;
      callback.mockClear();
    });
    describe('and no event is provided', () => {
      it('should throw error', () => {
        //@ts-ignore
        expect(() => EA.publish()).toThrowError(new Error('Event channel/type is invalid.'));
      });
    });
    describe('and no callback was provided in subscriber', () => {
      it('should do nothing', () => {
        //@ts-ignore
        EA.subscribe(emptyEvent);
        const fn = () => EA.publish(emptyEvent, payload);
        expect(fn).not.toThrow();
      });
    });
    describe('and event is a string', () => {
      it('should call handler', () => {
        EA.subscribe(dummyEvent, callback);
        EA.publish(dummyEvent, payload);
        expect(callback).toHaveBeenCalledTimes(1);
        expect(callback).toHaveBeenLastCalledWith(payload, dummyEvent);
      });
    });
    describe('and event is an instance of Klass', () => {
      describe('if klass instance is provided', () => {
        describe('but subscriber was not provided with valid class', () => {
          it('do nothing', () => {
            class Klass {}
            const klass = new Klass();
            EA.subscribe(klass, callback);
            const fn = () => EA.publish(klass, payload);
            expect(fn).not.toThrow();
          });
        });
        it('should call callback function', () => {
          class Klass {}
          const klass = new Klass();
          EA.subscribe(Klass, callback);
          EA.publish(klass, payload);
          expect(callback).toHaveBeenCalledTimes(2);
        });
      });
    });
  });
});
