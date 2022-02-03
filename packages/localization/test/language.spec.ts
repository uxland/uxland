import {expect} from '@open-wc/testing';
import * as EA from '@uxland/event-aggregator';
import {
  DEFAULT_LANGUAGE,
  getDefaultLanguage,
  getLanguage,
  resetLanguage,
  setLanguage,
} from '../language';
describe('language utilities', () => {
  describe('when getting language', () => {
    it('should return default language', () => {
      expect(getLanguage()).to.deep.equal(DEFAULT_LANGUAGE);
    });
  });
  describe('when setting language', () => {
    let spy: jest.SpyInstance;
    beforeEach(() => {
      spy = jest.spyOn(EA, 'publish');
      setLanguage('es');
    });
    it('should publish an event to communicate update in locales dictionary', () => {
      expect(spy).toHaveBeenCalled();
    });
    it('should set provided language as default', () => {
      expect(getLanguage()).to.deep.equal('es');
    });
  });
  describe('when resetting language', () => {
    let spy: jest.SpyInstance;
    beforeEach(() => {
      spy = jest.spyOn(EA, 'publish');
      resetLanguage();
    });
    it('should publish an event to communicate language reset', () => {
      expect(spy).toHaveBeenCalled();
    });
    it('should have default language', () =>
      expect(getLanguage()).to.deep.equal(getDefaultLanguage()));
  });
});
