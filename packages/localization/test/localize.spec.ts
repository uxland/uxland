import {expect} from '@open-wc/testing';
import {disposeLocalizer, initializeLocalizer, localize} from '../localize';
import {localizerFactory} from '../localizer-factory';
describe('localize function', () => {
  describe('given that localizer is not defined', () => {
    beforeEach(() => disposeLocalizer());
    it('should throw error', () => {
      try {
        localize('foo');
      } catch (error) {
        expect(error.message).to.deep.equal(
          'Default localizer has not been initialized. Please, call initializeLocalizer first in order to create a default localizer'
        );
      }
    });
  });
  describe('given a localizer has been defined', () => {
    let language, locales, lf, internalLocalizer;
    beforeEach(() => {
      language = 'en';
      locales = {en: {foo: 'bar'}};
      lf = localizerFactory(language, locales);
      internalLocalizer = initializeLocalizer(lf);
    });
    it('default localizer should be defined', () => {
      expect(internalLocalizer).to.not.be.undefined;
      expect(internalLocalizer).to.deep.equal(lf);
    });
    it('should return empty string if no message found for provided key', () => {
      expect(localize('qux')).to.deep.equal('');
    });
    it('should return corresponding message for provided key', () => {
      expect(localize('foo')).to.deep.equal('bar');
    });
  });
});
