import { idEq } from "../id-eq";

describe("id equallity fixture", () => {
  describe('Given an object {id: "foo"}', () => {
    const obj = { id: "foo" };
    it('should return true if value is "foo"', () => {
      expect(idEq("foo")(obj)).toBeTruthy();
    });
    it('should return false if value is "bar"', () => {
      expect(idEq("bar")(obj)).toBeFalsy();
    });
  });
  describe("Given an object without id property", () => {
    const obj: any = { foo: "bar" };
    it("should return true if value is undefined", () => {
      expect(idEq(undefined)(obj)).toBeTruthy();
    });
    it("should return false if provided value is another", () => {
      expect(idEq("bar")(obj)).toBeFalsy();
    });
  });
});
