import { DEFAULT_LANGUAGE, getLanguage, resetLanguage, setLanguage } from '../language';

describe('language utilities', () => {
  describe('when getting language', () => {
    it('should return default language', () => {
      expect(getLanguage()).toEqual(DEFAULT_LANGUAGE);
    });
  });
  describe('when setting language', () => {
    beforeAll(() => setLanguage('es'));
    it('should set provided language as default', () => {
      expect(getLanguage()).toEqual('es');
    });
  });
  describe('when reseting language', () => {
    beforeAll(() => resetLanguage());
    it('should reset to default language', () => {
      expect(getLanguage()).toEqual(DEFAULT_LANGUAGE);
    });
  });
});
