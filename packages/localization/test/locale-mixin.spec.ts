import {expect} from '@open-wc/testing';
import {resetFormatters, setFormatters} from '../format';
import {resetLanguage, setLanguage} from '../language';
import {localeMixin} from '../locale-mixin';
import {resetLocales, setLocales} from '../locales';
import {localizerFactory} from '../localizer-factory';
describe('locale mixin', () => {
  describe('given a class that is using localeMixin', () => {
    let locale, testClass;
    let BaseClass, TestClass;
    beforeEach(() => {
      locale = localeMixin(localizerFactory);
      BaseClass = class Base {
        baseProp = 'foo';
      };
      TestClass = class Test extends locale(BaseClass) {};
      testClass = new TestClass();
    });
    it('should be instance of both Base and Test', () => {
      expect(testClass).to.be.instanceOf(BaseClass);
      expect(testClass).to.be.instanceOf(TestClass);
    });
    it('should have a "baseProp" constant from Base class defined', () =>
      expect(testClass.baseProp).to.not.be.undefined);
    it('should have a "language" constant from locale mixin defined', () =>
      expect(testClass.language).to.not.be.undefined);
    it('should have a "locales" constant from locale mixin defined', () =>
      expect(testClass.locales).to.not.be.undefined);
    it('should have a "formats" constant from locale mixin defined', () =>
      expect(testClass.formats).to.not.be.undefined);
    it('should have a "localize" function from locale mixin', () =>
      expect(testClass.localize).to.not.be.undefined);
    describe('when calling "localize" function', () => {
      beforeEach(() => setLocales({en: {test: 'mixin'}}));
      it('should return corresponding message for provided key', () =>
        expect(testClass.localize('test')).to.deep.equal('mixin'));
      afterEach(() => resetLocales());
    });
    describe('when changing default language of localization', () => {
      beforeEach(() => setLanguage('ca'));
      it('should have new language value', () => expect(testClass.language).to.deep.equal('ca'));
      afterEach(() => resetLanguage());
    });
    describe('when changing default formats of localization', () => {
      beforeEach(() =>
        setFormatters({
          number: {EUR: {style: 'currency', currency: 'EUR'}},
        })
      );
      it('should have new formats value', () =>
        expect(testClass.formats).to.deep.equal({
          number: {EUR: {style: 'currency', currency: 'EUR'}},
        }));
      afterEach(() => resetFormatters());
    });
    describe('when changing default locales of localization', () => {
      beforeEach(() => setLocales({en: {foo: 'bar'}}));
      it('should have new locales value', () => {
        expect(testClass.locales).to.deep.equal({en: {foo: 'bar'}});
        expect(testClass.localize('foo')).to.deep.equal('bar');
      });
      afterEach(() => resetLocales());
    });
    describe('given a second class using localeMixin', () => {
      let AuxClass, auxClass;
      beforeEach(() => {
        AuxClass = class Aux extends locale(BaseClass) {
          auxProp = 'aux';
        };
        auxClass = new AuxClass();
      });
      it('should be instance of both AuxClass and BaseClass', () => {
        expect(auxClass).to.be.instanceOf(BaseClass);
        expect(auxClass).to.be.instanceOf(AuxClass);
      });
      it('should not be instance of TestClass', () =>
        expect(auxClass).not.to.be.instanceOf(TestClass));
      describe('when changing default language', () => {
        beforeEach(() => setLanguage('fr'));
        it('should have new language value', () => expect(auxClass.language).to.deep.equal('fr'));
      });
    });
  });
});
