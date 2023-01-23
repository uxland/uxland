import { createAsyncSlice } from "../../create-async-slice";
import { AsyncStateStatus } from "../../domain";
import { StoreService } from "../../store-service";

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
      service.dispatch(slice.actions.setStatus(AsyncStateStatus.succeeded));
      expect(service.getState()?.foo?.status).toEqual(
        AsyncStateStatus.succeeded
      );
    });
  });
  describe("When resetting store", () => {
    it("should reset store to default state", () => {
      const noResetableSlice = createAsyncSlice(
        "noReset",
        { status: AsyncStateStatus.idle, data: { foo: "bar" }, error: null },
        false
      );
      const { setData, setError } = noResetableSlice.actions;
      service.injectReducer("noReset", noResetableSlice.reducer);
      const error = new Error("error-message");
      service.dispatch(setData("dummy"));
      service.dispatch(setError(error.message));
      service.resetStore();
      expect(service.getState()?.foo?.status).toEqual(AsyncStateStatus.idle);
      expect(service.getState()?.noReset?.error).toEqual(error.message);
    });
  });
});
