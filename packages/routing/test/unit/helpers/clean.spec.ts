import { clean } from "../../../src/helpers/clean";

describe("Clean", () => {
  describe("when provided string is undefined", () => {
    it("should return undefined", () => {
      expect(clean(undefined)).toBeUndefined();
    });
  });
  describe("when provided string is a regular expression", () => {
    it("should return the provided string", () => {
      expect(clean(new RegExp(/\/+$/))).toEqual(/\/+$/);
    });
  });
  describe("when provided string is a path", () => {
    it("should return same path preceeded by ^", () => {
      expect(clean("/dummy")).toEqual("^/dummy");
    });
  });
  describe("when provided string is a full url", () => {
    it("should return the same provided string", () => {
      const url = "http://localhost:8080/dummy";
      expect(clean(url)).toEqual(url);
    });
  });
});
