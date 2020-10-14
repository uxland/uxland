import IntlMessageFormat from "intl-messageformat";
import { localizerFactory } from "../src/localizer-factory";

describe("Localizer Factory", () => {
  describe("Given an initial localizer factory", () => {
    //@ts-ignore
    const lf = localizerFactory();
    it("should return an empty string when localizing a message", () => {
      expect(lf("foo")).toEqual("");
    });
  });
  describe("Given a factory with language but no locales", () => {
    //@ts-ignore
    const lf = localizerFactory("en");
    it("should return an empty string when localizing a message", () => {
      expect(lf("foo")).toEqual("");
    });
  });
  describe("Given a factory with locales but no default language", () => {
    const lf = localizerFactory(undefined, { en: { foo: "bar" } });
    it("should return an empty string when localizing a message", () => {
      expect(lf("foo")).toEqual("");
    });
  });
  describe("Given a factory with language and locales", () => {
    const language = "en";
    const locales = { en: { foo: "bar" } };
    const lf = localizerFactory(language, locales);
    it("should return corresponding message for provided key", () => {
      expect(lf("foo")).toEqual(locales[language]["foo"]);
    });
    it("should return empty string if no message found for provided key", () => {
      expect(lf("qux")).toEqual("");
    });
    describe("if provided locales are defined for multiple language", () => {
      it("should return corresponding message for provided key if key is found in default language", () => {
        expect(lf("foo")).toEqual(locales[language]["foo"]);
      });
      it("should return empty string if provided key is not in default language", () => {
        expect(lf("qux")).toEqual("");
      });
    });
  });
  describe("Given a factory with language, locales and `useKeyIfMissing`", () => {
    const language = "en";
    const locales = { en: { foo: "bar" } };
    const lf = localizerFactory(language, locales, undefined, true);
    it("should return provided key if locale does not exist", () => {
      expect(lf("qux")).toEqual("qux");
    });
  });
  describe("Given a factory with language and formatted locales", () => {
    const language = "en";
    const locales = { en: { greeting: "Hi {name}" } };
    const lf = localizerFactory(language, locales);
    it("should return original locale if no argument is provided", () => {
      expect(lf("greeting")).toEqual(locales[language]["greeting"]);
    });
    it("should return localized message using provided arguments", () => {
      expect(lf("greeting", "name", "Charlie")).toEqual("Hi Charlie");
    });
    it("should return localized message using provided argument object", () => {
      expect(lf("greeting", { name: "Charlie" })).toEqual("Hi Charlie");
    });
    it("should return localized message using provided argument array", () => {
      expect(lf("greeting", ["name", "Charlie"])).toEqual("Hi Charlie");
    });
    describe("If locale message is pluralized", () => {
      const locales = {
        en: {
          cats: "{cats, plural, =0 {No cats} =1 {A cat} other {# cats}}",
          dogs: "{dogs, plural, =0 {No dogs} =1 {A dog}}",
        },
      };
      const lf = localizerFactory(language, locales);
      it("should return full locale message if no value is provided", () => {
        expect(lf("cats")).toEqual(locales[language]["cats"]);
      });
      it('should return "No cats" if value is 0', () => {
        expect(lf("cats", { cats: 0 })).toEqual("No cats");
      });
      it('should return "A cat" if value is 1', () => {
        expect(lf("cats", { cats: 1 })).toEqual("A cat");
      });
      it('should return "2 cats" if value is 2', () => {
        expect(lf("cats", { cats: 2 })).toEqual("2 cats");
      });
      it('should return "2 cats" if provided value is a string of "2"', () => {
        expect(lf("cats", { cats: "2" })).toEqual("2 cats");
      });
      it("should crash if provided value has no corresponding plural", () => {
        const fn = (): string | IntlMessageFormat => lf("dogs", { dogs: 2 });
        expect(fn).toThrow();
      });
    });
    describe("If custom formatter is provided", () => {
      const locales = {
        en: { salary: "Your salary is {salary, number, EUR}" },
      };
      const formats = {
        number: { EUR: { style: "currency", currency: "EUR" } },
      };
      const lf = localizerFactory(language, locales, formats);
      it("should return formatted message", () => {
        expect(lf("salary", { salary: 2000 })).toEqual(
          "Your salary is €2,000.00"
        );
      });
    });
  });
});
