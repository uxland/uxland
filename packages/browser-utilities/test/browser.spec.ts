import {isAndroid, isMobileBrowser, isMobileOrTabletBrowser, isTabletBrowser} from '../src/browser';

describe('Given a browser', () => {
  describe('and tablet device', () => {
    it('should return true for tablet device', () => {
      Object.defineProperty(navigator, 'userAgent', {
        get: () =>
          'Mozilla/5.0 (iPad; CPU OS 11_0 like Mac OS X) AppleWebKit/604.1.34 (KHTML, like Gecko) Version/11.0 Mobile/15A5341f Safari/604.1',
        configurable: true,
      });
      expect(isTabletBrowser()).toBeTruthy();
    });
    it('should return false for mobile device', () => {
      Object.defineProperty(navigator, 'userAgent', {
        get: () =>
          'Mozilla/5.0 (iPad; CPU OS 11_0 like Mac OS X) AppleWebKit/604.1.34 (KHTML, like Gecko) Version/11.0 Mobile/15A5341f Safari/604.1',
        configurable: true,
      });
      expect(isMobileBrowser()).toBeFalsy();
    });
    it('should return true for mobile or tablet device', () => {
      Object.defineProperty(navigator, 'userAgent', {
        get: () =>
          'Mozilla/5.0 (iPad; CPU OS 11_0 like Mac OS X) AppleWebKit/604.1.34 (KHTML, like Gecko) Version/11.0 Mobile/15A5341f Safari/604.1',
        configurable: true,
      });
      expect(isMobileOrTabletBrowser()).toBeTruthy();
    });
  });
  describe('and mobile device', () => {
    it('should return false for tablet device', () => {
      Object.defineProperty(navigator, 'userAgent', {
        get: () =>
          'Mozilla/5.0 (Linux; U; Android 4.4.2; en-us; SCH-I535 Build/KOT49H) AppleWebKit/534.30 (KHTML, like Gecko) Version/4.0 Mobile Safari/534.30',
        configurable: true,
      });
      expect(isTabletBrowser()).toBeTruthy();
    });
    it('should return true for mobile device', () => {
      Object.defineProperty(navigator, 'userAgent', {
        get: () =>
          'Mozilla/5.0 (Linux; U; Android 4.4.2; en-us; SCH-I535 Build/KOT49H) AppleWebKit/534.30 (KHTML, like Gecko) Version/4.0 Mobile Safari/534.30',
        configurable: true,
      });
      expect(isMobileBrowser()).toBeTruthy();
    });
    it('should return true for mobile or tablet device', () => {
      Object.defineProperty(navigator, 'userAgent', {
        get: () =>
          'Mozilla/5.0 (Linux; U; Android 4.4.2; en-us; SCH-I535 Build/KOT49H) AppleWebKit/534.30 (KHTML, like Gecko) Version/4.0 Mobile Safari/534.30',
        configurable: true,
      });
      expect(isMobileOrTabletBrowser()).toBeTruthy();
    });
    it('should return true for android', () => {
      Object.defineProperty(navigator, 'userAgent', {
        get: () =>
          'Mozilla/5.0 (Linux; U; Android 4.4.2; en-us; SCH-I535 Build/KOT49H) AppleWebKit/534.30 (KHTML, like Gecko) Version/4.0 Mobile Safari/534.30',
        configurable: true,
      });
      expect(isAndroid()).toBeTruthy();
    });
  });
});
