import { IRegion, Region } from "../src";
import { ViewDefinition } from "../src/view-definition";

describe("Given a region instance", () => {
  let region: IRegion<any>;
  let host: HTMLElement | any;
  let dummyView: ViewDefinition<HTMLElement>;
  beforeEach(() => {
    host = document.createElement("div");
    host.setAttribute("id", "dummy-region");
    region = new Region<HTMLElement>("dummy", undefined, host, {
      name: "dummy",
      targetId: "dummy-region",
    });
    dummyView = {
      factory: async () => Promise.resolve(document.createElement("div")),
    };
  });
  describe("When adding a view", () => {
    describe("and view has no constructor or factory", () => {
      it("should throw error", async (done) => {
        const invalidView = {};
        try {
          await region.addView("dummy-view", invalidView);
        } catch (error) {
          expect(error).toBeDefined();
        } finally {
          done();
        }
      });
    });
    describe("and is a valid view", () => {
      it("should update view collection", async (done) => {
        await region.addView("dummy-view", dummyView);
        expect(region.currentViews).toEqual([dummyView]);
        done();
      });
    });
    describe("when registering two views with same key", () => {
      it("should throw an error of duplicate views", async (done) => {
        try {
          const dummyView2 = {
            factory: async () =>
              Promise.resolve(document.createElement("span")),
          };
          await region.addView("dummy-view", dummyView);
          await region.addView("dummy-view", dummyView2);
        } catch (error) {
          expect(error).toBeDefined();
        } finally {
          done();
        }
      });
    });
  });
  describe("When retrieving a view", () => {
    describe("and view is not existing", () => {
      it("should return nothing", () => {
        expect(region.getView("undefined-view")).toEqual(undefined);
      });
    });
    describe("and view is previously registered", () => {
      it("should return registered view", async (done) => {
        await region.addView("dummy-view", dummyView);
        expect(region.getView("dummy-view")).toEqual(dummyView);
        done();
      });
    });
  });
  describe("When retrieving a view key", () => {
    describe("and view is not existing", () => {
      it("should return nothing", () => {
        expect(region.getKey(dummyView)).toEqual(undefined);
      });
    });
    describe("and view is previously registered", () => {
      it("should return registered view", async (done) => {
        await region.addView("dummy-view", dummyView);
        expect(region.getKey(dummyView)).toEqual("dummy-view");
        done();
      });
    });
  });
  describe("When checking if region contains a view", () => {
    describe("using view key", () => {
      describe("and view is not existing", () => {
        it("should return nothing", () => {
          expect(region.containsView("dummy-view")).toBeFalsy();
        });
      });
      describe("and view is previously registered", () => {
        it("should return registered view", async (done) => {
          await region.addView("dummy-view", dummyView);
          expect(region.containsView("dummy-view")).toBeTruthy();
          done();
        });
      });
    });
    describe("using view definition", () => {
      describe("and view is not existing", () => {
        it("should return nothing", () => {
          expect(region.containsView(dummyView)).toBeFalsy();
        });
      });
      describe("and view is previously registered", () => {
        it("should return registered view", async (done) => {
          await region.addView("dummy-view", dummyView);
          expect(region.containsView(dummyView)).toBeTruthy();
          done();
        });
      });
    });
  });
  describe("When clearing a region", () => {
    it("should empty views collection", () => {
      region.addView("dummy-view", dummyView);
      expect(region.currentViews).toEqual([dummyView]);
      region.clearRegion();
      expect(region.currentViews).toEqual([]);
    });
  });
  describe("When removing a view", () => {
    it("should delete view", () => {
      region.addView("dummy-view", dummyView);
      expect(region.currentViews).toEqual([dummyView]);
      region.removeView("dummy-view");
      expect(region.currentViews).toEqual([]);
    });
  });
  describe("When activating a view", () => {
    describe("using view key", () => {
      describe("and view is not registered", () => {
        it("should throw error", async (done) => {
          try {
            await region.activate("dummy-view");
          } catch (error) {
            expect(error).toBeDefined();
          } finally {
            done();
          }
        });
      });
      describe("and view exists in region", () => {
        it("should set active attribute to true", async (done) => {
          await region.addView("dummy-view", dummyView);
          await region.activate("dummy-view");
          expect(true).toBeFalsy();

          done();
        });
      });
    });
    describe("using view definition", () => {
      describe("and view is not registered", () => {
        it("should throw error", async (done) => {
          try {
            await region.addView("dummy-view", {
              factory: () => Promise.resolve(document.createElement("div")),
            });
            await region.activate(dummyView);
          } catch (error) {
            expect(error).toBeDefined();
          } finally {
            done();
          }
        });
      });
    });
  });
  // describe('When deactivating a view', () => {});
});
