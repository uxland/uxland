import { toQueryParams } from "../../../src/helpers/to-query-params";

describe("Given an object to be serialized", () => {
  describe("and object is undefined", () => {
    it("should return empty string", () =>
      expect(toQueryParams(undefined)).toEqual(""));
  });
  describe("and object is empty", () => {
    it("should return empty string", () =>
      expect(toQueryParams({})).toEqual(""));
  });
  describe("and object is not empty", () => {
    describe("and object has only a property", () => {
      it("should return key=value string", () =>
        expect(toQueryParams({ foo: "bar" })).toEqual("foo=bar"));
    });
    describe("and object has a decoded property", () => {
      it("should return key=value with encoded key", () =>
        expect(toQueryParams({ "@foo": "bar" })).toEqual(
          `${encodeURIComponent("@foo")}=bar`
        ));
    });
    describe("and object has more properties", () => {
      it("should return a chain of key=value string", () =>
        expect(toQueryParams({ foo: "bar", qux: "quux" })).toEqual(
          "foo=bar&qux=quux"
        ));
      describe("and a property is decoded", () => {
        it("should return chain of key=value string encoding needed values", () => {
          expect(
            toQueryParams({ foo: "bar", qux: "quux", dummy: "@dummy" })
          ).toEqual("foo=bar&qux=quux&dummy=%40dummy");
        });
      });
      describe("and a property is an object", () => {
        it("", () =>
          expect(toQueryParams({ foo: { bar: "dummy" } })).toEqual("foo=bar"));
      });
    });
  });
});
