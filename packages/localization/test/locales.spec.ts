import * as EA from '@uxland/event-aggregator';
import {getDefaultLocales, getLocales, resetLocales, setLocales} from '../locales';

describe('locales utilities', () => {
  const locales = {en: {foo: 'bar'}};

  describe('when getting default locales', () => {
    it('should return an object', () => {
      expect(getDefaultLocales()).toBeDefined();
    });
  });
  describe('when setting locales', () => {
    let spy: jest.SpyInstance;
    beforeAll(() => {
      spy = jest.spyOn(EA, 'publish');
      setLocales(locales);
    });
    it('should publish an event to communicate update in locales dictionary', () => {
      expect(spy).toHaveBeenCalled();
    });
    it('should merge locales with previous ones', () => {
      const newLocales = {en: {test: 'dummy'}};
      setLocales(newLocales);
      expect(getLocales()).toEqual({en: {foo: 'bar', test: 'dummy'}});
    });
    describe('when getting locales', () => {
      it('should return provided locales merged with default locales if called for first time', () => {
        expect(getLocales()).toEqual({en: {foo: 'bar', test: 'dummy'}});
      });
    });
    afterAll(() => spy.mockClear());
  });
  describe('when resetting locales', () => {
    let spy: jest.SpyInstance;
    beforeAll(() => {
      spy = jest.spyOn(EA, 'publish');
      resetLocales();
    });
    it('should publish an event to communicate locales reset', () => {
      expect(spy).toHaveBeenCalled();
    });
  });
});
