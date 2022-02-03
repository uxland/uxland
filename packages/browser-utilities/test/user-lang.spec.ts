import {getBrowserLang} from '../user-lang';
describe('Given a navigator', () => {
  describe('and no language is set', () => {
    it('should return default language', () => {
      Object.defineProperty(navigator, 'languages', {
        get: () => [],
        configurable: true,
      });
      expect(getBrowserLang()).toEqual('ca');
    });
  });
  describe('and language is set', () => {
    describe('and only a language is set', () => {
      it("should return navigator's language", () => {
        Object.defineProperty(navigator, 'languages', {
          get: () => ['es'],
          configurable: true,
        });
        expect(getBrowserLang()).toEqual('es');
      });
    });
    describe('and language is an english variant', () => {
      it('should return english language', () => {
        Object.defineProperty(navigator, 'languages', {
          get: () => ['en-GB'],
          configurable: true,
        });
        expect(getBrowserLang()).toEqual('en');
      });
    });
    describe('and multiple languages are set', () => {
      it('should return first found language', () => {
        Object.defineProperty(navigator, 'languages', {
          get: () => ['de', 'en-GB', 'es-CO'],
          configurable: true,
        });
        expect(getBrowserLang()).toEqual('en');
      });
    });
  });
});
