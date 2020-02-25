import IntlMessageFormat from 'intl-messageformat';
import { disposeLocalizer, initializeLocalizer, localize } from '../localize';
import { localizerFactory } from '../localizer-factory';

describe('localize function', () => {
  describe('given that localizer is not defined', () => {
    beforeAll(() => disposeLocalizer());
    it('should throw error', () => {
      const fn = (): string | IntlMessageFormat => localize('foo');
      expect(fn).toThrow(
        'Default localizer has not been initialized. Please, call initializeLocalizer firsT in order to create a default localizer'
      );
    });
  });
  describe('given a localizer has been defined', () => {
    let language, locales, lf, internalLocalizer;
    beforeAll(() => {
      language = 'en';
      locales = { en: { foo: 'bar' } };
      lf = localizerFactory(language, locales);
      internalLocalizer = initializeLocalizer(lf);
    });
    it('default localizer should be defined', () => {
      expect(internalLocalizer).toBeDefined();
      expect(internalLocalizer).toEqual(lf);
    });
    it('should return empty string if no message found for provided key', () => {
      expect(localize('qux')).toEqual('');
    });
    it('should return corresponding message for provided key', () => {
      expect(localize('foo')).toEqual('bar');
    });
  });
});
