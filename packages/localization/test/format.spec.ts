import {expect} from '@open-wc/testing';
import * as EA from '@uxland/event-aggregator';
import {getFormatters, resetFormatters, setFormatters} from '../format';
describe('formatters utilities', () => {
  describe('when getting formatters', () => {
    it('should return default formatters', () => {
      expect(getFormatters()).to.deep.equal({});
    });
  });
  describe('when setting formatters', () => {
    let spy: jest.SpyInstance;
    beforeEach(() => {
      spy = jest.spyOn(EA, 'publish');
      setFormatters({
        number: {EUR: {style: 'currency', currency: 'EUR'}},
      });
    });
    it('should publish an event to communicate update in locales dictionary', () => {
      expect(spy).toHaveBeenCalled();
    });
    it('should set provided formatters as default', () => {
      expect(getFormatters()).to.deep.equal({
        number: {EUR: {style: 'currency', currency: 'EUR'}},
      });
    });
  });
  describe('when resetting formatters', () => {
    let spy: jest.SpyInstance;
    beforeEach(() => {
      spy = jest.spyOn(EA, 'publish');
      resetFormatters();
    });
    it('should publish an event to communicate formatters reset', () => {
      expect(spy).toHaveBeenCalled();
    });
    it('should have default formatters', () => expect(getFormatters()).to.deep.equal({}));
  });
});
