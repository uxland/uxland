import { validateView } from "../src/validate-view";

describe("Given view validator", () => {
  describe("and view is undefined", () => {
    it("should throw an error", () => {
      const validation = () => validateView(undefined);
      expect(validation).toThrow("Must specify a view");
    });
  });
  describe("and view has no factory or constructor", () => {
    it("should throw an error", () => {
      const validation = () => validateView({});
      expect(validation).toThrow("Must specify a factory or constructor");
    });
  });
  describe("and view has a factory", () => {
    describe("and factory is not valid", () => {
      it("should throw an error", () => {
        const validation = () => validateView({ factory: "string" } as any);
        expect(validation).toThrow("Factory must be a function");
      });
    });
    describe("and factory is valid", () => {
      it("should return true", () => {
        const view = {
          factory: async () => Promise.resolve(document.createElement("div")),
        };
        expect(validateView(view)).toBeTruthy();
      });
    });
  });
  describe("and view has a constructor", () => {
    describe("and constructor is not valid", () => {
      it("should throw an error", () => {
        const validation = () => validateView({ constr: "string" } as any);
        expect(validation).toThrow("Must provide a valid constructor");
      });
    });
    describe("and constructor is valid", () => {
      it("should return true", () => {
        class Klass {}
        const view = { constr: () => new Klass() };
        expect(validateView(view as any)).toBeTruthy();
      });
    });
  });
});
