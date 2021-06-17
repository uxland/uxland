import {assert, expect} from '@open-wc/testing';
import * as rewire from 'rewire';
// import * as EA from "@uxland/event-aggregator";
import {stub} from 'sinon';
import {getDefaultLocales, getLocales, resetLocales, setLocales} from '../locales';
const EA = rewire('@uxland/event-aggregator');

describe('locales utilities', () => {
  const locales = {en: {foo: 'bar'}};

  describe('when getting default locales', () => {
    it('should return an object', () => {
      expect(getDefaultLocales()).to.not.be.undefined;
    });
  });
  describe('when setting locales', () => {
    let spy: any;
    beforeEach(() => {
      // spy = jest.spyOn(EA, "publish");
      spy = stub(EA, 'publish');
      setLocales(locales);
    });
    it('should publish an event to communicate update in locales dictionary', () => {
      assert(spy.called);
    });
    it('should merge locales with previous ones', () => {
      const newLocales = {en: {test: 'dummy'}};
      setLocales(newLocales);
      expect(getLocales()).to.deep.equal({en: {foo: 'bar', test: 'dummy'}});
    });
    describe('when getting locales', () => {
      it('should return provided locales merged with default locales if called for first time', () => {
        expect(getLocales()).to.deep.equal({
          en: {foo: 'bar', test: 'dummy'},
        });
      });
    });
    afterEach(() => spy.mockClear());
  });
  describe('when resetting locales', () => {
    let spy: any;
    beforeEach(() => {
      spy = jest.spyOn(EA, 'publish');
      resetLocales();
    });
    it('should publish an event to communicate locales reset', () => {
      expect(spy).toHaveBeenCalled();
    });
  });
});
