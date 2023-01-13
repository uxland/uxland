import { createAsyncSlice } from "../../../redux/create-async-slice";
import { AsyncStateStatus } from "../../../redux/domain";
import { StoreService } from "../../../redux/store-service";

describe("Given a StoreService instance", () => {
  let service: StoreService, slice;
  beforeAll(() => {
    slice = createAsyncSlice("foo", {
      status: AsyncStateStatus.idle,
      data: null,
      error: null,
    });
    service = new StoreService({ foo: slice.reducer }, "test", true);
  });
  it("should return store", () => {
    expect(service.getStore()?.getState()).toBeDefined();
  });
  it("should return corresponding state", () => {
    expect(service.getState()?.foo).toBeDefined();
  });

  describe("When injecting a new reducer", () => {
    it("should be set in state", () => {
      service.injectReducer(
        "bar",
        createAsyncSlice("bar", {
          status: AsyncStateStatus.idle,
          data: "dummy",
          error: null,
        }).reducer
      );
      expect(service.getState().bar).toBeDefined();
      expect(service.getState()?.bar?.data).toEqual("dummy");
    });
  });
  describe("When dispatching action", () => {
    it("should be present in state", () => {
      const { setStatus } = slice.actions;
      service.dispatch(slice.actions.setStatus(AsyncStateStatus.succeeded));
      expect(service.getState()?.foo?.status).toEqual(
        AsyncStateStatus.succeeded
      );
    });
  });
});
