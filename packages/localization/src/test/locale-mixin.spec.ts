import { resetLanguage, setLanguage } from '../language';
import { localeMixin } from '../locale-mixin';
import { resetLocales, setLocales } from '../locales';
import { localizerFactory } from '../localizer-factory';

describe('locale mixin', () => {
  describe('given a class that is using localeMixin', () => {
    let locale, testClass, base;
    let BaseClass, TestClass;
    beforeAll(() => {
      locale = localeMixin(localizerFactory);
      BaseClass = class Base {
        baseProp = 'foo';
      };
      base = new BaseClass();
      TestClass = class Test extends locale(BaseClass) {};
      testClass = new TestClass();
    });
    it('should be instance of both Base and Test', () => {
      expect(testClass).toBeInstanceOf(BaseClass);
      expect(testClass).toBeInstanceOf(TestClass);
    });
    it('should have a "baseProp" constant from Base class defined', () => expect(testClass.baseProp).toBeDefined());
    it('should have a "language" constant from locale mixin defined', () => expect(testClass.language).toBeDefined());
    it('should have a "locales" constant from locale mixin defined', () => expect(testClass.locales).toBeDefined());
    it('should have a "localize" function from locale mixin', () => expect(testClass.localize).toBeDefined());
    describe('when calling "localize" function', () => {
      beforeAll(() => setLocales({ en: { test: 'mixin' } }));
      it('should return corresponding message for provided key', () =>
        expect(testClass.localize('test')).toEqual('mixin'));
    });
    describe('when changing default language of localization', () => {
      beforeAll(() => setLanguage('ca'));
      it('should have new language value', () => expect(testClass.language).toEqual('ca'));
      afterAll(() => resetLanguage());
    });
    describe('when changing default locales of localization', () => {
      beforeAll(() => setLocales({ en: { foo: 'bar' } }));
      it('should have new locales value', () => expect(testClass.locales).toEqual({ en: { foo: 'bar' } }));
      afterAll(() => resetLocales());
    });
    describe('given a second class using localeMixin', () => {
      let AuxClass, auxClass;
      beforeAll(() => {
        AuxClass = class Aux extends locale(BaseClass) {
          auxProp = 'aux';
        };
        auxClass = new AuxClass();
      });
      it('should be instance of both AuxClass and BaseClass', () => {
        expect(auxClass).toBeInstanceOf(BaseClass);
        expect(auxClass).toBeInstanceOf(AuxClass);
      });
      it('should not be instance of TestClass', () => expect(auxClass).not.toBeInstanceOf(TestClass));
      describe('when changing default language', () => {
        beforeAll(() => setLanguage('fr'));
        it('should have new language value', () => expect(auxClass.language).toEqual('fr'));
      });
    });
  });
});
