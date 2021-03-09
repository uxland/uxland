import { serializeValue } from "../../../src/helpers/serialize-value";

describe("Given a value provided to serializeValue function", () => {
  describe("that is undefined", () => {
    it("should return empty string", () =>
      expect(serializeValue(undefined)).toEqual(""));
  });
  describe("that is null", () => {
    it("should return empty string", () =>
      expect(serializeValue(null)).toEqual(""));
  });
  describe("that is a string", () => {
    describe("and is empty string", () => {
      it("should return empty string", () =>
        expect(serializeValue("")).toEqual(""));
    });
    describe("and is simple string", () => {
      it("should return same string", () =>
        expect(serializeValue("dummy")).toEqual("dummy"));
    });
    describe("and is decoded string", () => {
      it("should return encoded string", () =>
        expect(serializeValue("@dummy")).toEqual(encodeURIComponent("@dummy")));
    });
  });
  describe("that is a number", () => {
    it("should return number as string", () =>
      expect(serializeValue(5)).toEqual("5"));
  });
  describe("that is a boolean", () => {
    it("should return same input as string", () =>
      expect(serializeValue(true)).toEqual("true"));
  });
});
